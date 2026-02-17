
import React from 'react';

const LaptopInterface = ({ onClose, scenes }) => {
    // Filter scenes for parts (indices 1-11)
    const partScenes = scenes.slice(1, 12);

    return (
        <div style={{
            position: 'absolute',
            // Center the interface over the laptop screen area
            top: '50%',
            left: '52.7%', // Slight left shift
            transform: 'translate(-50%, -50%)',
            // Adjusted size to fill laptop screen
            width: '70vw',
            maxWidth: '1400px',
            height: '83vh', // Explicit height to be "taller"
            maxHeight: '95vh',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '25px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            // overflow: 'hidden', // Allow notch to overlap
            color: '#1a1a1a',
            fontFamily: 'system-ui, sans-serif'
        }}>

            {/* NOTCH */}
            <div style={{
                position: 'absolute',
                top: '-1px', // Overlap the container border
                left: '50%',
                transform: 'translateX(-50%)',
                width: '200px', // Bigger notch
                height: '36px',
                background: '#0a0a0a', // Matches typical bezel
                borderBottomLeftRadius: '16px',
                borderBottomRightRadius: '16px',
                // Border only on bottom and sides to trace the shape
                borderBottom: '1px solid rgba(0, 0, 0, 0.1)', // Matches container border
                borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
                borderRight: '1px solid rgba(0, 0, 0, 0.1)',
                zIndex: 2000, // On top of everything
                // No shadow
            }}></div>

            {/* Header */}
            <div style={{
                padding: '25px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'rgba(0,0,0,0.02)'
            }}>
                <div>
                    <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#8B5CF6' }}>Parts Catalog</h2>
                    <p style={{ margin: '5px 0 0', fontSize: '14px', color: '#666' }}>Scroll to view all custom components</p>
                </div>

                {/* Back Navigation Button (Arrow Style) */}
                <button
                    onClick={onClose}
                    className="nav-btn-interface"
                    aria-label="Back"
                    style={{
                        background: 'rgba(0, 0, 0, 0.05)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        color: '#1a1a1a',
                        width: '36px', // Matched to .nav-btn
                        height: '36px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        padding: 0 // Remove button padding
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = '#8B5CF6';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = '#8B5CF6';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                        e.currentTarget.style.color = '#1a1a1a';
                        e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.1)';
                    }}
                >
                    <span style={{ fontSize: "18px", lineHeight: "1", paddingBottom: "3px", marginRight: "3px" }}>❮</span>
                </button>
            </div>

            {/* Content */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '80px', // Spacing between sections
            }}>
                {/* Real Room Feature Card */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '60px',
                    width: '100%',
                    paddingBottom: '80px', // Spacing before the first part
                    borderBottom: '1px solid rgba(0,0,0,0.05)'
                }}>
                    <div style={{
                        flex: 1,
                        aspectRatio: '4/3', // Taller aspect ratio for the room photo
                        background: 'rgba(0,0,0,0.05)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        border: '1px solid rgba(0,0,0,0.05)'
                    }}>
                        <img
                            src="/images/room-real-life.jpg"
                            alt="My Real Room"
                            style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'white' }}
                        />
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            margin: '0 0 20px 0',
                            fontSize: '36px',
                            fontWeight: '700',
                            color: '#8B5CF6',
                            letterSpacing: '-0.5px'
                        }}>Real Life Execution</h3>
                        <p style={{
                            margin: 0,
                            fontSize: '20px',
                            color: '#444',
                            lineHeight: '1.8',
                            fontWeight: '300'
                        }}>
                            This is a picture of my room in real life. You can see everything I designed present here, seamlessly integrated into my daily space. The 3D experience you are exploring is a digital twin of this exact setup.
                        </p>
                    </div>
                </div>

                {partScenes.filter((scene, i) => {
                    const originalIndex = scenes.indexOf(scene);
                    // Keep only if it has an image in our map
                    const imageMap = {
                        2: true, 3: true, 4: true, 5: true,
                        6: true, 7: true, 9: true, 10: true
                    };
                    return imageMap[originalIndex];
                }).map((scene, index) => {
                    const [title, desc] = scene.label.split('\n');
                    const isEven = index % 2 === 0;

                    return (
                        <div key={index} style={{
                            display: 'flex',
                            flexDirection: isEven ? 'row' : 'row-reverse',
                            alignItems: 'center',
                            gap: '60px',
                            width: '100%'
                        }}>
                            {/* Image Placeholder */}
                            <div style={{
                                flex: 1,
                                aspectRatio: '16/9',
                                background: 'rgba(0,0,0,0.05)',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '48px',
                                border: '1px solid rgba(0,0,0,0.05)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
                                overflow: 'hidden'
                            }}>
                                {(() => {
                                    // Map scene index (from original scenes array) to image
                                    // partScenes starts at index 1 of scenes array.
                                    // So loop index 0 = scenes[1], index 1 = scenes[2], etc.
                                    const originalIndex = scenes.indexOf(scene);

                                    const imageMap = {
                                        2: '/images/parts/bed-side-stand.png',   // Bed Side Stand
                                        3: '/images/parts/outlet-stand.png',     // Outlet Stand
                                        4: '/images/parts/extension-planks.png', // Extension Planks (New)
                                        5: '/images/parts/lamp-base.png',        // Lamp Base
                                        6: '/images/parts/cologne-cubby.png',    // Cologne Cubby
                                        7: '/images/parts/wall-shelf.png',       // Wall Shelf
                                        // 8: Shelf Individual (no image)
                                        // 9: Shelves Together (no image)
                                        9: '/images/parts/shelf-stand.png',      // Shelf Support (Index 9)
                                        10: '/images/parts/sponge-tray.png'      // Sponge Tray (Index 10)
                                    };

                                    const imgSrc = imageMap[originalIndex];

                                    if (imgSrc) {
                                        return <img src={imgSrc} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'white' }} />;
                                    }
                                    return '📷';
                                })()}
                            </div>

                            {/* Text Content */}
                            <div style={{ flex: 1, textAlign: isEven ? 'left' : 'right' }}>
                                <h3 style={{
                                    margin: '0 0 20px 0',
                                    fontSize: '32px',
                                    fontWeight: '700',
                                    color: '#8B5CF6',
                                    letterSpacing: '-0.5px'
                                }}>{title}</h3>
                                <p style={{
                                    margin: 0,
                                    fontSize: '18px',
                                    color: '#444',
                                    lineHeight: '1.8',
                                    fontWeight: '300'
                                }}>{desc}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default LaptopInterface;
