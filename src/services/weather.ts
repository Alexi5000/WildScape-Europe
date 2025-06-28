import { WeatherData, WeatherParticle } from '@/types/weather';

export class WeatherService {
  private static instance: WeatherService;
  
  public static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  generateWeatherParticles(condition: string, count: number = 100): WeatherParticle[] {
    const particles: WeatherParticle[] = [];
    
    for (let i = 0; i < count; i++) {
      const particle: WeatherParticle = {
        id: `particle_${i}`,
        x: Math.random() * 100 - 50,
        y: Math.random() * 50,
        z: Math.random() * 100 - 50,
        velocity: this.getVelocityForCondition(condition),
        life: Math.random() * 100,
        maxLife: 100,
        size: this.getSizeForCondition(condition),
        opacity: Math.random() * 0.8 + 0.2
      };
      
      particles.push(particle);
    }
    
    return particles;
  }

  private getVelocityForCondition(condition: string) {
    switch (condition) {
      case 'rain':
        return {
          x: Math.random() * 2 - 1,
          y: -(Math.random() * 5 + 5),
          z: Math.random() * 2 - 1
        };
      case 'snow':
        return {
          x: Math.random() * 1 - 0.5,
          y: -(Math.random() * 2 + 1),
          z: Math.random() * 1 - 0.5
        };
      case 'fog':
        return {
          x: Math.random() * 0.5 - 0.25,
          y: Math.random() * 0.5 - 0.25,
          z: Math.random() * 0.5 - 0.25
        };
      default:
        return { x: 0, y: 0, z: 0 };
    }
  }

  private getSizeForCondition(condition: string): number {
    switch (condition) {
      case 'rain':
        return Math.random() * 0.3 + 0.1;
      case 'snow':
        return Math.random() * 0.8 + 0.2;
      case 'fog':
        return Math.random() * 2 + 1;
      default:
        return 0.5;
    }
  }

  updateParticles(particles: WeatherParticle[], deltaTime: number): WeatherParticle[] {
    return particles.map(particle => {
      // Update position
      particle.x += particle.velocity.x * deltaTime;
      particle.y += particle.velocity.y * deltaTime;
      particle.z += particle.velocity.z * deltaTime;
      
      // Update life
      particle.life -= deltaTime * 10;
      
      // Reset particle if it's dead or out of bounds
      if (particle.life <= 0 || particle.y < -25) {
        particle.x = Math.random() * 100 - 50;
        particle.y = Math.random() * 25 + 25;
        particle.z = Math.random() * 100 - 50;
        particle.life = particle.maxLife;
      }
      
      // Update opacity based on life
      particle.opacity = Math.min(1, particle.life / particle.maxLife);
      
      return particle;
    });
  }

  getWeatherIcon(condition: string): string {
    const icons = {
      clear: '☀️',
      cloudy: '☁️',
      rain: '🌧️',
      snow: '❄️',
      fog: '🌫️'
    };
    
    return icons[condition as keyof typeof icons] || '🌤️';
  }

  getWeatherColor(condition: string): string {
    const colors = {
      clear: '#FCD34D',
      cloudy: '#9CA3AF',
      rain: '#3B82F6',
      snow: '#E5E7EB',
      fog: '#D1D5DB'
    };
    
    return colors[condition as keyof typeof colors] || '#9CA3AF';
  }
}

export const weatherService = WeatherService.getInstance();