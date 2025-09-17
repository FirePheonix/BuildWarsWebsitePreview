import React, { useState } from 'react';
import { ExternalLink, Eye, EyeOff } from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showTools, setShowTools] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isGame = project.category?.toLowerCase() === 'game';

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 transition-all duration-300 group">
      {/* Preview Image/Iframe */}
      <div className="h-48 bg-gray-800 relative overflow-hidden">
        {project.image && !imageError ? (
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <iframe
              src={project.url}
              title={project.name}
              className="w-full h-full border-0 pointer-events-none scale-50 origin-top-left"
              style={{ width: '200%', height: '200%' }}
              onError={() => setImageError(true)}
            />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-30"
          >
            <ExternalLink className="w-6 h-6 text-white" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-elegant text-xl font-semibold text-pitch-white leading-tight">
            {project.name}
          </h3>
          {project.category && (
            <span className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full font-medium">
              {project.category}
            </span>
          )}
        </div>

        {project.description && (
          <p className="text-gray-300 text-sm mb-4 leading-relaxed font-sans">
            {project.description}
          </p>
        )}

        {/* Tools Section for Games */}
        {isGame && project.tools && (
          <div className="border-t border-gray-800 pt-4">
            <button
              onClick={() => setShowTools(!showTools)}
              className="flex items-center gap-2 text-gray-400 hover:text-pitch-white transition-colors duration-200 text-sm font-medium"
            >
              {showTools ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showTools ? 'Hide Tools' : 'Reveal Tools'}
            </button>
            
            {showTools && (
              <div className="mt-3 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                <p className="text-gray-300 text-sm font-sans">
                  <span className="font-medium text-pitch-white">Tools used:</span> {project.tools}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Non-game tools */}
        {!isGame && project.tools && (
          <div className="border-t border-gray-800 pt-4">
            <p className="text-gray-300 text-sm font-sans">
              <span className="font-medium text-pitch-white">Built with:</span> {project.tools}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
