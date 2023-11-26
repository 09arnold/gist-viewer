import Badge from "./components/utils/Badge";

export const getBadges = (files) => {
  const languages = Array.from(
    new Set(files.map(file => getBadgeContent(file)))
  );

  return <div className="badges">
    {languages.map(language => <Badge key={language}>{language}</Badge>)}
  </div>
};

export const getBadgeContent = (file) => {
  let content = file.language || file.type;
  if (!content) {
    const filenameParts = file.filename.split('.');
    content = filenameParts[filenameParts.length - 1]
  }
  return content;
}

export const sortForks = (forks) => {
  return forks.sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  })
}
/**
 * 
 * @param {number} bytes Raw file size
 * @param {*} decimals Number of decimal places to round to
 * @returns 
 */
export const formatBytes = (bytes, decimals = 2) => { //https://stackoverflow.com/a/18650828
  if (!+bytes) return '0 Bytes'

  const k = 1000
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}