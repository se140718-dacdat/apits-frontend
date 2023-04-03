export const getDaysLeft = (createAt: Date, expired: Date) => {
    const timeDiff = (new Date(expired) as any) - (new Date(createAt) as any);
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    return days;
  }