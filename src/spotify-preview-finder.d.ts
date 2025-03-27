// spotify-preview-finder.d.ts
declare module 'spotify-preview-finder' {
    interface PreviewResult {
      success: boolean;
      results: Array<{
        previewUrls: string[];
      }>;
      error?: string;
    }
  
    function spotifyPreviewFinder(trackName: string, limit: number): Promise<PreviewResult>;
  
    export { spotifyPreviewFinder };
  }
  