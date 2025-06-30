import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Camera, Compass, Leaf } from 'lucide-react';

interface StoryStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  trigger: 'scroll' | 'click' | 'hover';
  content: {
    text: string;
    image?: string;
    action?: string;
  };
}

export const StorytellingElements: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));
  const [isStoryMode, setIsStoryMode] = useState(false);

  const storySteps: StoryStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to the Forest',
      description: 'Begin your journey into Europe\'s most pristine wilderness',
      icon: <Leaf className="w-6 h-6" />,
      position: { x: 50, y: 20 },
      trigger: 'click',
      content: {
        text: 'Step into a world where ancient trees whisper stories of centuries past. Your adventure begins here, where every path leads to discovery.',
        image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg',
        action: 'Start Exploring'
      }
    },
    {
      id: 'discover',
      title: 'Discover Hidden Gems',
      description: 'Uncover secret camping spots known only to locals',
      icon: <MapPin className="w-6 h-6" />,
      position: { x: 25, y: 40 },
      trigger: 'scroll',
      content: {
        text: 'Beyond the beaten path lie treasures waiting to be found. Each campsite tells a unique story of the land and its guardians.',
        image: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg',
        action: 'View Campsites'
      }
    },
    {
      id: 'capture',
      title: 'Capture the Magic',
      description: 'Document your journey through pristine landscapes',
      icon: <Camera className="w-6 h-6" />,
      position: { x: 75, y: 60 },
      trigger: 'hover',
      content: {
        text: 'Every sunrise brings new wonders. From misty mornings to starlit nights, nature provides an endless gallery of moments.',
        image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg',
        action: 'Photo Gallery'
      }
    },
    {
      id: 'navigate',
      title: 'Navigate Your Path',
      description: 'Use our interactive maps to plan your perfect route',
      icon: <Compass className="w-6 h-6" />,
      position: { x: 40, y: 80 },
      trigger: 'click',
      content: {
        text: 'Let technology guide you through nature\'s maze. Our 3D terrain maps reveal every hill, valley, and hidden trail.',
        action: 'Open Map'
      }
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      const newStep = Math.floor(scrollProgress * storySteps.length);
      
      if (newStep !== currentStep && newStep < storySteps.length) {
        setCurrentStep(newStep);
        setVisitedSteps(prev => new Set([...prev, newStep]));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentStep, storySteps.length]);

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setVisitedSteps(prev => new Set([...prev, stepIndex]));
    setIsStoryMode(true);
  };

  const nextStep = () => {
    if (currentStep < storySteps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setVisitedSteps(prev => new Set([...prev, next]));
    }
  };

  const currentStoryStep = storySteps[currentStep];

  return (
    <>
      {/* Story Navigation Dots */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 space-y-4">
        {storySteps.map((step, index) => (
          <motion.button
            key={step.id}
            onClick={() => handleStepClick(index)}
            className={`relative w-4 h-4 rounded-full border-2 transition-all duration-300 ${
              visitedSteps.has(index)
                ? 'bg-forest-medium border-forest-medium'
                : 'bg-transparent border-forest-light'
            } ${
              currentStep === index
                ? 'scale-125 shadow-lg'
                : 'hover:scale-110'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {/* Tooltip */}
            <div className="absolute left-full ml-4 top-1/2 transform -translate-y-1/2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-forest-deep text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
                {step.title}
              </div>
            </div>

            {/* Connection line */}
            {index < storySteps.length - 1 && (
              <div 
                className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-8 transition-colors duration-300 ${
                  visitedSteps.has(index + 1) ? 'bg-forest-medium' : 'bg-forest-light'
                }`}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Interactive Story Points */}
      <div className="fixed inset-0 pointer-events-none z-30">
        {storySteps.map((step, index) => (
          <motion.div
            key={step.id}
            className="absolute pointer-events-auto"
            style={{
              left: `${step.position.x}%`,
              top: `${step.position.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: visitedSteps.has(index) ? 1 : 0.6,
              scale: currentStep === index ? 1.2 : 1
            }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <motion.button
              onClick={() => handleStepClick(index)}
              className={`w-12 h-12 rounded-full glass-forest flex items-center justify-center text-forest-primary hover:text-forest-medium transition-all duration-300 ${
                currentStep === index ? 'ring-4 ring-forest-medium ring-opacity-50' : ''
              }`}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
              }}
            >
              {step.icon}
            </motion.button>

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-forest-medium"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Story Modal */}
      <AnimatePresence>
        {isStoryMode && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsStoryMode(false)}
          >
            <motion.div
              className="glass-forest rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-forest-medium text-white flex items-center justify-center">
                  {currentStoryStep.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-forest-deep">
                    {currentStoryStep.title}
                  </h2>
                  <p className="text-forest-primary">
                    {currentStoryStep.description}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {currentStoryStep.content.image && (
                  <div className="relative h-64 rounded-xl overflow-hidden">
                    <img
                      src={currentStoryStep.content.image}
                      alt={currentStoryStep.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                )}

                <p className="text-lg leading-relaxed text-forest-primary">
                  {currentStoryStep.content.text}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-forest-medium">
                      Step {currentStep + 1} of {storySteps.length}
                    </span>
                    <div className="flex gap-1">
                      {storySteps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentStep
                              ? 'bg-forest-medium'
                              : visitedSteps.has(index)
                              ? 'bg-forest-light'
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {currentStoryStep.content.action && (
                      <button className="btn btn-secondary">
                        {currentStoryStep.content.action}
                      </button>
                    )}
                    
                    {currentStep < storySteps.length - 1 && (
                      <button
                        onClick={nextStep}
                        className="btn btn-primary flex items-center gap-2"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="glass-forest px-4 py-2 rounded-full">
          <div className="flex items-center gap-2 text-sm text-forest-primary">
            <span>Journey Progress:</span>
            <div className="w-24 h-2 bg-forest-light rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-forest-medium rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(visitedSteps.size / storySteps.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span>{Math.round((visitedSteps.size / storySteps.length) * 100)}%</span>
          </div>
        </div>
      </div>
    </>
  );
};