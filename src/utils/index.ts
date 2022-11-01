import { JobType } from "../types/job-type";

export const fetchData = async () => {
  const res = await fetch(
    `https://api.json-generator.com/templates/ZM1r0eic3XEy/data`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu",
      },
    }
  );
  const data = (await res.json()) as JobType[];
  return data;
};

export const getDescription = (str: string | undefined) => {
  if (str) {
    const endIndex = str.indexOf(".\n");
    return str.substring(3, endIndex + 1);
  }
};

export const getBenefits = (str: string | undefined) => {
  if (str) {
    const string = str.indexOf("\t");
    const newString = str.substring(string + 5, str.length - 4);
    return newString.split(". ");
  }
};

export const getResponsibilities = (str: string | undefined) => {
  if (str) {
    const startIndex = str.indexOf(":\n");
    const endIndex = str.indexOf("Compensation");
    return str.substring(startIndex + 6, endIndex - 4);
  }
};
