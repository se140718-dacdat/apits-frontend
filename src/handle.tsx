export const getDaysLeft = (createAt: string, expired: string) => {
  const timeDiff = (new Date(expired) as any) - (new Date(createAt) as any);
  const days = Math.floor(timeDiff / (1000 * 3600 * 24));
  return days;
}

export const openNewTab = (url: string) => {
  window.open(url, '_blank');
}

export const getCommissionPercent = (experience: string) => {
  switch (experience) {
    case "Intern":
      return "5%"
    case "Fresher":
      return "8%"
    case "Middle":
      return "10%"
    default:
      return "15%"
  }
}