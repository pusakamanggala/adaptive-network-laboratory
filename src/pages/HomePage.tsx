import { useMemo } from "react";
import { Events } from "../components/Events";
import { HeroSection } from "../components/HeroSections";
import { useGetLandingPage } from "../hooks/useGetLandingPage";
import { VideoProfile } from "../components/VideoProfile";
import { LearningMaterial } from "../components/LearningMaterial";

type LandingPageData = {
  kegiatan: {
    uid: string;
    judul: string;
    descSingkat: string;
    hyperlink: string;
  }[];
  article: {
    judul: string;
    caption: string;
    hyperlink: string;
  }[];
  pembina: {
    uid: string;
    judul: string;
    isi: string;
    namaPembina: string;
    imageUrl: string;
  }[];
  faq: {
    uid: string;
    judul: string;
    isi: string;
  }[];
};

// export type for article
export type Article = LandingPageData["article"];

// export type for event
export type Event = LandingPageData["kegiatan"];

export const HomePage = () => {
  const { data, isSuccess, isError } = useGetLandingPage();

  const landingPageData = useMemo<LandingPageData | null>(() => {
    if (isSuccess) {
      // If the query is successful, use the fresh data
      return data.data;
    } else if (isError) {
      // If there's an error, retrieve data from local storage
      const localStorageData = localStorage.getItem("landingPageData");
      return localStorageData ? JSON.parse(localStorageData) : null;
    }
    // Default value if the query is error and there's no data in local storage
    return null;
  }, [data, isSuccess, isError]);

  return (
    <main className="space-y-20">
      {landingPageData && (
        <>
          <HeroSection />
          <Events eventData={landingPageData.kegiatan} />
          <VideoProfile />
          <LearningMaterial learningMaterialData={landingPageData.article} />
        </>
      )}
    </main>
  );
};