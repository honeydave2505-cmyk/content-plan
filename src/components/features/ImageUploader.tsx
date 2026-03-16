"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";

interface ImageUploaderProps {
  onImageSelect: (file: File, preview: string) => void;
}

export default function ImageUploader({ onImageSelect }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setPreview(url);
      onImageSelect(file, url);
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition ${
        dragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-300 bg-gray-50 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-800"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        aria-label="Upload an image"
      />

      {preview ? (
        <img
          src={preview}
          alt="Uploaded preview"
          className="max-h-64 rounded-lg object-contain"
        />
      ) : (
        <>
          <span className="text-4xl">🖼️</span>
          <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-300">
            Drag &amp; drop an image or <span className="text-blue-600">browse</span>
          </p>
          <p className="mt-1 text-xs text-gray-400">
            PNG, JPG, or WEBP up to 10 MB
          </p>
        </>
      )}
    </div>
  );
}
