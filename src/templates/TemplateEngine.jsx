import ClassicTemplate from './ClassicTemplate';
import VintageTemplate from './VintageTemplate';
import RoyalTemplate from './RoyalTemplate';
import IllustrationTemplate from './IllustrationTemplate';

export default function TemplateEngine({ data }) {
  // Map colors to actual Tailwind classes dynamically
  const colorMap = {
    rose: 'text-rose-600 border-rose-200 bg-rose-50',
    emerald: 'text-emerald-700 border-emerald-200 bg-emerald-50',
    gold: 'text-amber-600 border-amber-300 bg-amber-50'
  };

  const fontMap = {
    serif: 'font-serif',
    sans: 'font-sans',
    mono: 'font-mono tracking-tight'
  };

  // Inject the chosen styles into the data object so templates can use them
  const styledData = {
    ...data,
    colorClasses: colorMap[data.color] || colorMap.rose,
    fontClass: fontMap[data.font] || fontMap.serif
  };

  // Render the correct template
  switch (data.theme) {
    case 'vintage':
      return <VintageTemplate data={styledData} />;
    case 'royal':
      return <RoyalTemplate data={styledData} />;
    case 'illustration':
    case 'location_vibe': // <--- Added this to handle the new location picker
      return <IllustrationTemplate data={styledData} />;
    case 'classic':
    default:
      return <ClassicTemplate data={styledData} />;
  }
}