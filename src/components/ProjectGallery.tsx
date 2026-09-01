import React, { useState } from 'react';
import { GALLERY_PROJECTS } from '../data/gallery';
import { ProjectItem, FenceStyleId } from '../types';
import {
  Camera,
  MapPin,
  X,
  Sparkles,
} from 'lucide-react';

interface ProjectGalleryProps {
  onSelectProjectStyle: (styleId: FenceStyleId) => void;
  onOpenQuote: () => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({
  onSelectProjectStyle,
  onOpenQuote,
}) => {
  const [filterStyle, setFilterStyle] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filteredProjects =
    filterStyle === 'all'
      ? GALLERY_PROJECTS
      : GALLERY_PROJECTS.filter((p) => p.style === filterStyle);

  return (
    <section id="gallery" className="py-16 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-400 mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Style &amp; Design Gallery</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Space_Grotesk']">
              Featured Project Showcase
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              Explore steel fencing and automated gate styles available for luxury residences and commercial properties across Canada.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-neutral-900 p-1.5 rounded-2xl border border-neutral-800 text-xs">
            <button
              onClick={() => setFilterStyle('all')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                filterStyle === 'all' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-300 hover:text-white'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilterStyle('nordic-slat')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                filterStyle === 'nordic-slat' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Modern Slat
            </button>
            <button
              onClick={() => setFilterStyle('corrugated-privacy')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                filterStyle === 'corrugated-privacy' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Corrugated
            </button>
            <button
              onClick={() => setFilterStyle('acoustic-sound')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                filterStyle === 'acoustic-sound' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Acoustic Sound
            </button>
            <button
              onClick={() => setFilterStyle('highland-ornamental')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                filterStyle === 'highland-ornamental' ? 'bg-amber-500 text-neutral-950' : 'text-neutral-300 hover:text-white'
              }`}
            >
              Ornamental
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden group cursor-pointer hover:border-amber-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
                  
                  <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-white border border-neutral-700 flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>{project.location}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                      {project.styleName}
                    </span>
                    <h3 className="text-base font-bold truncate">{project.title}</h3>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex justify-between items-center text-[11px] text-neutral-400 pt-2 border-t border-neutral-800">
                    <span>Height: <strong className="text-white">{project.height}</strong></span>
                    <span>Footage: <strong className="text-white">{project.linearFeet} LF</strong></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox for Project View */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 bg-neutral-950/90 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-700 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative">
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-4 right-4 p-2 bg-neutral-950/80 rounded-full text-neutral-400 hover:text-white z-10 border border-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-72 sm:h-96">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-6 right-6 text-white">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {activeModalProject.styleName} • {activeModalProject.location}
                  </span>
                  <h3 className="text-2xl font-black font-['Space_Grotesk'] mt-1">
                    {activeModalProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {activeModalProject.description}
                </p>

                <div className="grid grid-cols-3 gap-3 p-3 bg-neutral-950 rounded-xl border border-neutral-800 text-xs">
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Installed Height</span>
                    <span className="font-bold text-white">{activeModalProject.height}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Total Footage</span>
                    <span className="font-bold text-white">{activeModalProject.linearFeet} Linear Feet</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block text-[11px]">Profile</span>
                    <span className="font-bold text-amber-400">{activeModalProject.styleName}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      onSelectProjectStyle(activeModalProject.style);
                      setActiveModalProject(null);
                    }}
                    className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Configure This Style in 3D</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveModalProject(null);
                      onOpenQuote();
                    }}
                    className="py-3 px-5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl border border-neutral-700 transition-colors cursor-pointer"
                  >
                    Request Site Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
