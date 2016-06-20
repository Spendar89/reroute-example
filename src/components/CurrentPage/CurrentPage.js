import * as pages from './../pages';

export default function CurrentPage ({ currentUrl, page={} }) {
  const Page = pages[currentUrl] || pages.default;
  console.log("pppaaages", currentUrl)
  return <Page {...page} />
};
