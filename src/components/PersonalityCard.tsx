import { useRef, useState } from 'react';
import type { PersonalityResult } from '../types';
import './PersonalityCard.css';
import sparkyFlying from '../assets/Sparky Flying 2.png';
import html2canvas from 'html2canvas';

interface PersonalityCardProps {
  result: PersonalityResult;
  onRestart: () => void;
  anchorRect?: { left: number; top: number; width: number; height: number } | null;
}

export const PersonalityCard = ({ result, onRestart }: PersonalityCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      console.log('🎬 Starting download...');

      // 1. Create a specialized container for the capture
      // This ensures we capture the card in a controlled environment (centered, specific background, no interference)
      const container = document.createElement('div');
      Object.assign(container.style, {
        position: 'fixed',
        left: '-9999px',
        top: '0',
        width: '1200px', // Fixed width for consistent output aspect ratio
        height: '1800px', // ~2:3 aspect ratio, generous spacing
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)', // Premium dark background
        zIndex: '-9999',
      });
      document.body.appendChild(container);

      // 2. Clone the card
      const clonedCard = cardRef.current.cloneNode(true) as HTMLElement;

      // 3. Style the CLONE for perfect export
      // Remove interactive transforms and animations that might look weird in a snapshot
      // FORCE DESKTOP LAYOUT: We explicitly set width to ~800px to trigger the desktop media query styles
      // scale(1.1) combined with the 3x canvas scale ensures high res.
      Object.assign(clonedCard.style, {
        transform: 'scale(1.1)',
        animation: 'none',
        margin: '0',
        boxShadow: '0 50px 100px -20px rgba(0,0,0,0.7)',
        maxHeight: 'none',
        overflow: 'visible',
        width: '800px',        // FIXED WIDTH to force desktop layout
        maxWidth: 'none',      // Override any responsive max-width
        minWidth: '800px'      // Ensure it doesn't shrink
      });

      // Fix Sparky in the clone
      const sparky = clonedCard.querySelector('.sparky-flying') as HTMLElement;
      if (sparky) {
        Object.assign(sparky.style, {
          position: 'absolute',
          display: 'block',
          opacity: '1',
          animation: 'none',
          transform: 'none',
          top: '-15px',
          right: '-15px',
          width: '140px', // Slightly larger for the export
          filter: 'drop-shadow(0 10px 25px rgba(255, 215, 0, 0.4))'
        });
      }

      // Fix Message Box transparency/shadow artifacts
      const messageBox = clonedCard.querySelector('.message') as HTMLElement;
      if (messageBox) {
        Object.assign(messageBox.style, {
          boxShadow: 'none', // Removing inset shadow which causes black artifacts
          background: 'rgba(255, 255, 255, 0.08)', // Slightly clearer background
          backdropFilter: 'none', // Simplify rendering
          ['webkitBackdropFilter' as any]: 'none'
        });
      }

      // Fix Traits list artifacts too, just in case
      const traitsItems = clonedCard.querySelectorAll('.traits-list li');
      traitsItems.forEach((item) => {
        const el = item as HTMLElement;
        el.style.boxShadow = 'none';
        el.style.backdropFilter = 'none';
        (el.style as any).webkitBackdropFilter = 'none';
      });

      // Hide buttons in the clone (we don't want download buttons in the image)
      const actions = clonedCard.querySelector('.card-actions') as HTMLElement;
      if (actions) actions.style.display = 'none';

      container.appendChild(clonedCard);

      // Wait a moment for DOM to settle and images to be ready
      await new Promise(resolve => setTimeout(resolve, 800));

      // 4. Capture
      const canvas = await html2canvas(container, {
        scale: 3, // 3x scale = ~3600px width (High Definition)
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
        width: 1200,
        height: 1800,
        windowWidth: 1920, // Force desktop viewport for media queries
        windowHeight: 1080
      } as any);

      // 5. Download
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Blob creation failed');
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const safeType = result.type.replace(/\s+/g, '-').replace(/[^a-z0-9-]/gi, '');
        const filename = `FunFortune-${safeType}.png`;
        link.download = filename;
        link.click();

        // Cleanup
        setTimeout(() => {
          URL.revokeObjectURL(url);
          document.body.removeChild(container);
          setIsDownloading(false);
        }, 1000);
      }, 'image/png', 1.0);

    } catch (error) {
      console.error('Download failed:', error);
      setIsDownloading(false);
      alert('Could not generate image. Please try again.');
    }
  };

  return (
    <>
      <div className="personality-card-backdrop" />
      <div className="personality-result-wrapper">
        <div className="personality-card" style={{ borderColor: result.color }} ref={cardRef}>
          <img src={sparkyFlying} alt="Sparky Flying" className="sparky-flying" />
          <div className="card-header" style={{ background: result.color }}>
            <h2>Your Personality Type</h2>
            <h1>{result.type}</h1>
          </div>

          <div className="card-body">
            <div className="message-section">
              <h3>Message for you:</h3>
              <p className="message">{result.message}</p>
            </div>

            <div className="traits-section">
              <h3>Your Key Traits:</h3>
              <ul className="traits-list">
                {result.traits.map((trait, index) => (
                  <li key={index}>{trait}</li>
                ))}
              </ul>
            </div>



            <div className="card-actions">
              <button
                className="download-button"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? '⏳ Generating Perfect Card...' : '💾 Download My Card'}
              </button>

              <button className="restart-button" onClick={onRestart}>
                Take the Test Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};







