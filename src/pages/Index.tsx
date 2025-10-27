import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import JSZip from "jszip";
import { useToast } from "@/hooks/use-toast";

interface Wallpaper {
  id: number;
  url: string;
  title: string;
  colorScheme: string;
  colors: string[];
}

const Index = () => {
  const wallpapers: Wallpaper[] = [
    {
      id: 1,
      url: 'https://cdn.poehali.dev/projects/065971fa-d3de-48df-8ddc-c3d533bd4b99/files/fa9e422c-50e3-413d-ae62-25420e704de9.jpg',
      title: 'NEON CIRCUIT',
      colorScheme: 'Неоновый пурпур и циан',
      colors: ['#9b87f5', '#00F0FF']
    },
    {
      id: 2,
      url: 'https://cdn.poehali.dev/projects/065971fa-d3de-48df-8ddc-c3d533bd4b99/files/dbd811b4-03ed-4727-8a0f-8201bebe456e.jpg',
      title: 'ELECTRIC GRID',
      colorScheme: 'Электрический синий и маджента',
      colors: ['#0099FF', '#FF00FF']
    },
    {
      id: 3,
      url: 'https://cdn.poehali.dev/projects/065971fa-d3de-48df-8ddc-c3d533bd4b99/files/92d925f6-c28d-48c8-a1b4-28d0f0aebf62.jpg',
      title: 'MATRIX GLOW',
      colorScheme: 'Фиолетовый и бирюзовый',
      colors: ['#8B00FF', '#00FFCC']
    },
    {
      id: 4,
      url: 'https://cdn.poehali.dev/projects/065971fa-d3de-48df-8ddc-c3d533bd4b99/files/e462cad9-dbcb-41be-9c60-e5c06860d3da.jpg',
      title: 'VAPORWAVE',
      colorScheme: 'Розовый и фиолетовый',
      colors: ['#FF1493', '#8B00FF']
    }
  ];

  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper>(wallpapers[0]);
  const [glitchActive, setGlitchActive] = useState(false);
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const { toast } = useToast();

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `machenike-${title.toLowerCase().replace(' ', '-')}-2560x1440.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWallpaperSelect = (wallpaper: Wallpaper) => {
    setGlitchActive(true);
    setTimeout(() => {
      setSelectedWallpaper(wallpaper);
      setGlitchActive(false);
    }, 200);
  };

  const handleDownloadAll = async () => {
    setIsDownloadingAll(true);
    toast({
      title: "Подготовка архива",
      description: "Загружаем все обои...",
    });

    try {
      const zip = new JSZip();
      
      for (const wallpaper of wallpapers) {
        const response = await fetch(wallpaper.url);
        const blob = await response.blob();
        const filename = `machenike-${wallpaper.title.toLowerCase().replace(' ', '-')}-2560x1440.jpg`;
        zip.file(filename, blob);
      }

      const content = await zip.generateAsync({ type: "blob" });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'machenike-cyberpunk-wallpapers.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      toast({
        title: "Готово!",
        description: "Все обои скачаны в архиве",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось создать архив",
        variant: "destructive",
      });
    } finally {
      setIsDownloadingAll(false);
    }
  };

  return (
    <div className="min-h-screen bg-cyber-gradient flex flex-col items-center justify-center p-4 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl w-full">
        <div className="text-center mb-8 animate-fade-in">
          <h1 
            className={`font-cyber text-5xl md:text-8xl font-black text-neon-cyan mb-4 tracking-wider transition-all duration-200 ${glitchActive ? 'blur-sm scale-95' : ''}`}
            onMouseEnter={() => setGlitchActive(true)}
            onMouseLeave={() => setGlitchActive(false)}
          >
            MACHENIKE
          </h1>
          <p className="text-neon-purple text-xl md:text-2xl font-light tracking-widest">
            CYBERPUNK WALLPAPER COLLECTION
          </p>
        </div>

        <div className="relative group mb-8 animate-scale-in" style={{ animationDelay: '0.2s' }}>
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative">
            <img 
              src={selectedWallpaper.url}
              alt={`Machenike ${selectedWallpaper.title} Wallpaper`}
              className={`w-full h-auto rounded-lg shadow-2xl border-2 border-primary/50 transition-all duration-300 ${glitchActive ? 'opacity-50' : 'opacity-100'}`}
            />
            <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-primary/50">
              <p className="font-cyber text-primary text-sm">{selectedWallpaper.title}</p>
              <p className="text-foreground/70 text-xs">{selectedWallpaper.colorScheme}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-center mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => handleDownload(selectedWallpaper.url, selectedWallpaper.title)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-background font-cyber text-lg px-8 py-6 rounded-lg shadow-lg shadow-primary/50 hover:shadow-primary/80 transition-all duration-300 hover:scale-105 group"
            >
              <Icon name="Download" size={24} className="mr-2 group-hover:animate-bounce" />
              СКАЧАТЬ 2560×1440
            </Button>
            
            <Button 
              onClick={handleDownloadAll}
              disabled={isDownloadingAll}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-background font-cyber text-lg px-8 py-6 rounded-lg shadow-lg shadow-accent/50 hover:shadow-accent/80 transition-all duration-300 hover:scale-105 group"
            >
              <Icon name={isDownloadingAll ? "Loader2" : "Package"} size={24} className={`mr-2 ${isDownloadingAll ? 'animate-spin' : 'group-hover:animate-pulse'}`} />
              {isDownloadingAll ? 'ЗАГРУЗКА...' : 'ВСЕ В АРХИВЕ'}
            </Button>
          </div>
          
          <div className="flex gap-4 text-foreground/70">
            <div className="flex items-center gap-2 font-cyber">
              <Icon name="Monitor" size={20} className="text-primary" />
              <span>2560×1440</span>
            </div>
            <div className="flex items-center gap-2 font-cyber">
              <Icon name="Palette" size={20} className="text-accent" />
              <span>4 ВАРИАНТА</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {wallpapers.map((wallpaper) => (
            <div
              key={wallpaper.id}
              onClick={() => handleWallpaperSelect(wallpaper)}
              className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
                selectedWallpaper.id === wallpaper.id 
                  ? 'ring-2 ring-primary shadow-lg shadow-primary/50' 
                  : 'ring-1 ring-foreground/20'
              }`}
            >
              <img 
                src={wallpaper.url}
                alt={wallpaper.title}
                className="w-full h-32 object-cover transition-all duration-300 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-2">
                <p className="font-cyber text-xs text-primary">{wallpaper.title}</p>
                <div className="flex gap-1 mt-1">
                  {wallpaper.colors.map((color, idx) => (
                    <div 
                      key={idx}
                      className="w-4 h-4 rounded-full border border-foreground/30"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              {selectedWallpaper.id === wallpaper.id && (
                <div className="absolute top-2 right-2 bg-primary text-background rounded-full p-1">
                  <Icon name="Check" size={12} />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center text-foreground/50 text-sm font-cyber animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p className="flex items-center justify-center gap-2 mb-2">
            <Icon name="Sparkles" size={16} className="text-primary" />
            DESIGNED FOR GAMING DOMINANCE
            <Icon name="Sparkles" size={16} className="text-accent" />
          </p>
          <p className="text-xs">Кликни на превью, чтобы выбрать вариант</p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
    </div>
  );
};

export default Index;