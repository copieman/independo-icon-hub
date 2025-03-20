
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';

// Icon types and variants
const iconTypes = ["Journal", "Todo", "Calendar"];
const iconVariants = ["raw", "optically centered", "with guide", "coloured", "dark mode"];
const fileFormats = ["png", "svg"];

// Types for our state management
type IconSelection = {
  [key: string]: {
    variant: string;
    format: string;
  };
};

const Index = () => {
  // State for tracking each icon's selected variant and format
  const [selections, setSelections] = useState<IconSelection>({
    Journal: { variant: "raw", format: "png" },
    Todo: { variant: "raw", format: "png" },
    Calendar: { variant: "raw", format: "png" }
  });

  // Function to update a single icon's selection
  const updateSelection = (iconType: string, field: "variant" | "format", value: string) => {
    setSelections(prev => ({
      ...prev,
      [iconType]: {
        ...prev[iconType],
        [field]: value
      }
    }));
  };

  // Function to handle downloading a single icon
  const handleDownload = (iconType: string) => {
    const { variant, format } = selections[iconType];
    // In a real app, this would trigger an actual file download
    const fileName = `${iconType}_${variant.replace(/ /g, '_')}.${format}`;
    
    // Get the appropriate URL
    const fileUrl = getSvgUrl(iconType, variant);
    
    if (fileUrl) {
      // Create an anchor element and trigger download
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`Downloading ${fileName}`);
    } else {
      toast.error(`File not found: ${fileName}`);
    }
  };

  // Function to handle downloading all icons
  const handleDownloadAll = () => {
    Object.keys(selections).forEach(iconType => {
      handleDownload(iconType);
    });
    toast.success("Downloading all selected icons");
  };

  // Helper function to get the SVG URL based on iconType and variant
  const getSvgUrl = (iconType: string, variant: string): string => {
    // Map variants to file names
    const variantFormatted = variant.replace(/ /g, '_');
    const fileName = `Independo Icons/${iconType} ${variant}.svg`;
    
    // Return the SVG URL
    return fileName;
  };

  // Helper function to get the appropriate preview image based on selections
  const getPreviewImage = (iconType: string): string => {
    const { variant } = selections[iconType];
    // For preview, we'll use the PNG versions
    return `Independo Icons/${iconType} ${variant}.png`;
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center">
      {/* Download All Button - Fixed in top right */}
      <div className="fixed top-8 right-8 z-10">
        <button 
          onClick={handleDownloadAll} 
          className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 download-btn"
        >
          <Download size={18} />
          <span>Download All</span>
        </button>
      </div>

      {/* Icon Grid */}
      <div className="flex flex-wrap justify-center gap-16 pt-24 px-8 max-w-7xl w-full">
        {iconTypes.map((iconType, index) => (
          <div 
            key={iconType} 
            className="flex flex-col items-center gap-5 animate-fade-in" 
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Icon Image */}
            <div className="app-icon w-40 h-40 md:w-48 md:h-48 flex items-center justify-center bg-white">
              <img 
                src={getPreviewImage(iconType)} 
                alt={`${iconType} icon - ${selections[iconType].variant}`}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Icon Name */}
            <div className="text-xl font-light text-gray-800">{iconType}</div>
            
            {/* Variant Dropdown */}
            <div className="w-full">
              <Select 
                value={selections[iconType].variant}
                onValueChange={(value) => updateSelection(iconType, "variant", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select variant" />
                </SelectTrigger>
                <SelectContent>
                  {iconVariants.map(variant => (
                    <SelectItem key={variant} value={variant}>
                      {variant}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Format Toggle and Download Button */}
            <div className="flex w-full gap-2">
              <div className="flex border rounded-md overflow-hidden">
                {fileFormats.map(format => (
                  <button
                    key={format}
                    className={`px-3 py-1.5 text-sm format-toggle ${
                      selections[iconType].format === format 
                        ? 'bg-black text-white' 
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                    onClick={() => updateSelection(iconType, "format", format)}
                  >
                    {format.toUpperCase()}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => handleDownload(iconType)} 
                className="flex-1 bg-black text-white rounded-md flex items-center justify-center gap-1 download-btn"
              >
                <Download size={16} />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
