import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://cdn.poehali.dev/projects/065971fa-d3de-48df-8ddc-c3d533bd4b99/files/95cc25a5-5013-4cb2-bc6c-470f8ea0872a.jpg';
    link.download = 'machenike-cyberpunk-wallpaper-2560x1440.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-cyber-gradient flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="font-cyber text-6xl md:text-8xl font-black text-neon-cyan mb-4 tracking-wider">
            MACHENIKE
          </h1>
          <p className="text-neon-purple text-xl md:text-2xl font-light tracking-widest">
            CYBERPUNK EDITION
          </p>
        </div>

        <div className="relative group mb-12 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative">
            <img 
              src="https://cdn.poehali.dev/projects/065971fa-d3de-48df-8ddc-c3d533bd4b99/files/95cc25a5-5013-4cb2-bc6c-470f8ea0872a.jpg"
              alt="Machenike Cyberpunk Wallpaper"
              className="w-full h-auto rounded-lg shadow-2xl border-2 border-primary/50"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            onClick={handleDownload}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-background font-cyber text-lg px-8 py-6 rounded-lg shadow-lg shadow-primary/50 hover:shadow-primary/80 transition-all duration-300 hover:scale-105 group"
          >
            <Icon name="Download" size={24} className="mr-2 group-hover:animate-bounce" />
            СКАЧАТЬ 2560×1440
          </Button>
          
          <div className="flex gap-4 text-foreground/70">
            <div className="flex items-center gap-2 font-cyber">
              <Icon name="Monitor" size={20} className="text-primary" />
              <span>2560×1440</span>
            </div>
            <div className="flex items-center gap-2 font-cyber">
              <Icon name="Zap" size={20} className="text-accent" />
              <span>CYBERPUNK</span>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-foreground/50 text-sm font-cyber animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="flex items-center justify-center gap-2">
            <Icon name="Sparkles" size={16} className="text-primary" />
            DESIGNED FOR GAMING DOMINANCE
            <Icon name="Sparkles" size={16} className="text-accent" />
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
    </div>
  );
};

export default Index;
