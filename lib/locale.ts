export type Locale = "en" | "vi";

export const LOCALE_STORAGE_KEY = "sdr-locale";

export const navLabels: Record<
  Locale,
  Record<"home" | "characters" | "news" | "features", string>
> = {
  en: {
    home: "Home",
    characters: "Characters",
    news: "News",
    features: "Features",
  },
  vi: {
    home: "Trang chủ",
    characters: "Nhân vật",
    news: "Tin tức",
    features: "Tính năng",
  },
};

export const characterStatLabels: Record<
  Locale,
  { age: string; height: string; division: string; role: string }
> = {
  en: {
    age: "Age",
    height: "Height",
    division: "Institute",
    role: "Role",
  },
  vi: {
    age: "Độ tuổi",
    height: "Chiều cao",
    division: "Phân viện",
    role: "Vai trò",
  },
};

export const homeLabels: Record<
  Locale,
  { preRegister: string; playTrailer: string }
> = {
  en: {
    preRegister: "Pre-register",
    playTrailer: "Play trailer",
  },
  vi: {
    preRegister: "Đăng ký trước",
    playTrailer: "Phát trailer",
  },
};

export const languageOptions: { value: Locale; label: string }[] = [
  { value: "en", label: "EN" },
  { value: "vi", label: "VI" },
];
