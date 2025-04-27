'use client';

import { motion } from 'framer-motion';

interface MovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  movies: string[];
}

export default function MovieModal({ isOpen, onClose, movies }: MovieModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="bg-gray-900 text-white rounded-lg p-6 w-[90%] max-w-md shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4">🎬 AI Recommended Movies</h2>
        <ul className="space-y-2">
          {movies.map((movie, index) => (
            <li key={index} className="bg-gray-800 p-2 rounded">
              {movie}
            </li>
          ))}
        </ul>
        <button
          className="mt-6 w-full bg-red-600 hover:bg-red-700 rounded p-2 transition"
          onClick={onClose}
        >
          Close
        </button>
      </motion.div>
    </div>
  );
}
