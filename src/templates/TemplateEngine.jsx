import ClassicTemplate from './ClassicTemplate';
import VintageTemplate from './VintageTemplate';
import RoyalTemplate from './RoyalTemplate';
import MountainTemplate from './MountainTemplate';
import BeachTemplate from './BeachTemplate';

export default function TemplateEngine({ data }) {
  if (!data) return null;

  switch (data.theme) {
    case 'vintage':
      return <VintageTemplate data={data} />;
    case 'royal':
      return <RoyalTemplate data={data} />;
    case 'mountain':
      return <MountainTemplate data={data} />;
    case 'beach':
      return <BeachTemplate data={data} />;
    case 'classic':
    default:
      return <ClassicTemplate data={data} />;
  }
}