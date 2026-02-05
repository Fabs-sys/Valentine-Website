import React, { useState, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function ValentineProposal() {
    const [noButtonSize, setNoButtonSize] = useState(100);
    const [yesButtonSize, setYesButtonSize] = useState(100);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [accepted, setAccepted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [noHoverCount, setNoHoverCount] = useState(0);
    const noButtonRef = useRef(null);

    const messages = [
        "Yaaay! Ich wusste es! 💕",
        "Das macht mich so glücklich! 🥰",
        "Gute Entscheidung :3 ✨"
    ];

    const hintMessages = [
        "Der 'Nein' Button ist etwas scheu...",
        "Huch, er ist weggelaufen!",
        "Versuch's nochmal... oder sag einfach ja?",
        "Bist du dir sicher? 🥺",
        "Der Button mag dich nicht...",
        "Vielleicht ist 'Ja' die bessere Wahl?",
        "So schüchtern dieser Button...",
        "Er versteckt sich vor dir!",
        "Gib einfach auf und sag ja!",
        "Ich glaube er will nicht angeklickt werden...",
        "Fast! Versuch's nochmal!",
        "Nope! Zu langsam!",
        "Vielleicht solltest du 'Ja' wählen?"
    ];

    const [currentHintMessage, setCurrentHintMessage] = React.useState("");

    const handleNoHover = () => {
        // Get viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        // Calculate safe movement range based on screen size
        const maxMoveX = Math.min(viewportWidth * 0.3, 200);
        const maxMoveY = Math.min(viewportHeight * 0.2, 150);
        
        // Move the button to a random position within safe bounds
        const randomX = Math.random() * maxMoveX * 2 - maxMoveX;
        const randomY = Math.random() * maxMoveY * 2 - maxMoveY;

        setNoButtonPosition({ x: randomX, y: randomY });

        // Shrink No button and grow Yes button (Yes button can grow HUGE!)
        setNoButtonSize(prev => Math.max(prev - 15, 30));
        setYesButtonSize(prev => prev + 25); // No maximum! Can grow infinitely!
        setNoHoverCount(prev => prev + 1);
        
        // Set random hint message
        const randomMessage = hintMessages[Math.floor(Math.random() * hintMessages.length)];
        setCurrentHintMessage(randomMessage);
    };

    const handleNoClick = (e) => {
        e.preventDefault();
        // Extra shrink on click attempt
        setNoButtonSize(prev => Math.max(prev - 20, 20));
        setYesButtonSize(prev => prev + 30); // No limit!
        handleNoHover();
    };

    const handleYesClick = () => {
        setAccepted(true);
        setShowConfetti(true);
    };

    // Confetti animation
    const Confetti = () => {
        const confettiPieces = Array.from({ length: 50 });

        return (
            <div className="fixed inset-0 pointer-events-none z-50">
                {confettiPieces.map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-confetti"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: '-10%',
                            animationDelay: `${Math.random() * 0.5}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                        }}
                    >
                        {['❤️', '💕', '💖', '✨', '🎉', '💐'][Math.floor(Math.random() * 6)]}
                    </div>
                ))}
            </div>
        );
    };

    if (accepted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 flex items-center justify-center p-4 overflow-hidden">
                {showConfetti && <Confetti />}
                <div className="text-center space-y-6 animate-scale-in px-4 w-full max-w-3xl">
                    <div className="text-7xl md:text-8xl animate-bounce">
                        💖
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-600 animate-fade-in px-2 break-words">
                        {messages[Math.floor(Math.random() * messages.length)]}
                    </h1>
                    <div className="flex justify-center gap-4">
                        <Sparkles className="text-yellow-400 animate-pulse" size={window.innerWidth < 768 ? 32 : 40} />
                        <Heart className="text-red-500 animate-pulse" size={window.innerWidth < 768 ? 32 : 40} />
                        <Sparkles className="text-yellow-400 animate-pulse" size={window.innerWidth < 768 ? 32 : 40} />
                    </div>
                    <p className="text-xl md:text-2xl text-purple-600 font-medium px-4">
                        Ich freue mich schon auf unser Date! 🥰
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200 flex items-center justify-center p-4 overflow-hidden">
            <div className="text-center space-y-8 md:space-y-12 w-full max-w-4xl">
                {/* Header */}
                <div className="space-y-4 animate-fade-in px-4">
                    <div className="text-6xl md:text-7xl animate-bounce">
                        💐
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-pink-600 font-serif px-2">
                        Willst du mein Valentinstagsdate sein?
                    </h1>
                </div>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 min-h-[250px] md:min-h-[200px] px-4">
                    {/* Yes Button */}
                    <button
                        onClick={handleYesClick}
                        className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-bold rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 z-10 flex items-center justify-center shrink-0"
                        style={{
                            width: `${yesButtonSize}px`,
                            height: `${yesButtonSize}px`,
                            fontSize: `${yesButtonSize / 5}px`
                        }}
                    >
                        Ja! 💕
                    </button>

                    {/* No Button - The tricky one */}
                    <button
                        ref={noButtonRef}
                        onMouseEnter={handleNoHover}
                        onMouseOver={handleNoHover}
                        onClick={handleNoClick}
                        onTouchStart={handleNoHover}
                        className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-bold rounded-full shadow-xl transition-all duration-200 flex items-center justify-center relative shrink-0 z-20"
                        style={{
                            width: `${noButtonSize}px`,
                            height: `${noButtonSize}px`,
                            fontSize: `${noButtonSize / 5}px`,
                            transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                            cursor: 'pointer'
                        }}
                    >
                        Nein
                    </button>
                </div>

                {/* Hint text */}
                {noHoverCount > 2 && (
                    <p className="text-lg text-pink-500 animate-fade-in font-medium px-4">
                        {currentHintMessage}
                    </p>
                )}
            </div>
        </div>
    );
}