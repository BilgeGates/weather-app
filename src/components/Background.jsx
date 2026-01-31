import { useEffect, useRef } from "react";

function Background({ weather }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(167, 139, 250, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(167, 139, 250, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Gradient Overlays */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Weather-based particles effect */}
      {weather && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {weather.weather[0].main === "Rain" && (
            <div className="rain-container">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="rain-drop"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${Math.random() * 0.5 + 0.5}s`,
                  }}
                />
              ))}
            </div>
          )}

          {weather.weather[0].main === "Snow" && (
            <div className="snow-container">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="snowflake"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${Math.random() * 3 + 2}s`,
                  }}
                >
                  ❄
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <style>{`
        .rain-drop {
          position: absolute;
          top: -10px;
          width: 2px;
          height: 20px;
          background: linear-gradient(transparent, rgba(255, 255, 255, 0.6));
          animation: rain-fall linear infinite;
        }

        @keyframes rain-fall {
          to {
            transform: translateY(100vh);
          }
        }

        .snowflake {
          position: absolute;
          top: -10px;
          color: white;
          font-size: 1.5rem;
          opacity: 0.8;
          animation: snow-fall linear infinite;
        }

        @keyframes snow-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}

export default Background;
