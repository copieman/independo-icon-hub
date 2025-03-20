
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
    // In a real app, this would use the actual file path
    const fileName = `${iconType.toLowerCase()}_${variant.replace(/ /g, '_')}.${format}`;
    toast.success(`Downloading ${fileName}`);
    
    // Simulate download - in a real app, this would trigger an actual file download
    // window.location.href = `/icons/${fileName}`;
    console.log(`Downloading: ${fileName}`);
  };

  // Function to handle downloading all icons
  const handleDownloadAll = () => {
    Object.keys(selections).forEach(iconType => {
      handleDownload(iconType);
    });
    toast.success("Downloading all selected icons");
  };

  // Helper function to get the appropriate image path based on selections
  const getImagePath = (iconType: string) => {
    const { variant } = selections[iconType];
    
    // Map variant names to icon indices (these would normally map to actual files)
    // For the demo, we're using the uploaded images in order
    const variantIndex = iconVariants.indexOf(variant);
    const typeIndex = iconTypes.indexOf(iconType);
    
    // Calculate index in the image set (3 variants per type, 3 types)
    const imageIndex = typeIndex * 5 + variantIndex;
    
    // Return the appropriate uploaded image path
    return `public/lovable-uploads/${[
      '40904533-7fe3-4143-accc-f252ed5ebdb2.png',
      '89bae6ea-075a-4420-80ec-8b2ffa9195eb.png',
      '969acc64-a3bd-49d8-8e27-438f10aedd8d.png',
      '7584dadc-d957-4972-8b9a-5047afde85d0.png',
      '9a3ac4b0-0b1c-4147-a53e-8999ba1a6fc0.png',
      '5633f748-3c25-43d6-b742-2d35644e44ce.png',
      'b70503a9-2ebc-496d-93d9-1a662ddf81e2.png',
      '4f45629d-c009-436f-bd2e-78d8d2c21690.png',
      '0a017553-805d-44c0-aa80-08b9d36f1f75.png',
      '269edc03-b99c-4992-a1ff-4a9e0a4f05c6.png',
      '12fb2fe5-52a6-4c63-852f-3a5ab5591583.png',
      'c1e9dacf-bdf5-40b8-9d38-16297fd1ad78.png',
      'e55b73ab-f53d-42e8-84ec-38aa07dc7208.png',
      '7a0206a6-bae5-4d3f-9047-7fc4e83bc8c2.png',
      '8264219f-3a53-4c61-bcb1-7c7f1feacc6d.png'
    ][imageIndex]}`;
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
                src={getImagePath(iconType)} 
                alt={`${iconType} icon - ${selections[iconType].variant}`}
                className="w-full h-full object-cover"
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
