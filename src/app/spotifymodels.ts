export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Artist {
  id: string;
  name: string;
  external_urls: { href: string };
}


export interface Album {
  id: string;
  name: string;
  release_date: string;
  artists: Artist[];
  images: Image[];
  album_type: string;
  external_urls: { href: string };
  total_tracks: number;
  popularity: number;
}


export interface SimplifiedArtistObject {
  id: string;
  name: string;
  href: string;  
  uri: string;  
}

export interface Track {
  id: string;                      
  name: string;                    
  artists: SimplifiedArtistObject[];  
  disc_number: number;             
  duration_ms: number;           
  explicit: boolean;               
  external_urls: { spotify: string };  
  href: string;                    
  is_playable: boolean;            
  linked_from?: {                 
    href: string;
    id: string;
  };
  restrictions?: {                
    reason: string;
  };
  preview_url: string | null;     
  track_number: number;            
  type: string;                    
  uri: string;                     
  is_local: boolean;               
}



