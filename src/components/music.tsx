import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import spotifywebapilogo from "../assets/spotifywebapilogo.png";
import "../styles/globals.css";

interface SpotifyUser {
  display_name: string;
  email: string;
  country: string;
  followers: {
    total: number;
  };
}

interface SpotifyTrack {
  name: string;
  artists: Array<{ name: string; id: string }>;
  album: {
    images: Array<{ url: string }>;
  };
}

interface SpotifyArtist {
  name: string;
  id: string;
  images: Array<{ url: string }>;
}

const clientId = "7d6c83f85ee04e91971d553903210241";
const clientSecret = "38e9fb07a3d74b1288c9e577926f5e70";
const isHosted = true;
const redirectUri = isHosted
  ? "https://portfolio-git-main-rahulcompani7s-projects.vercel.app/beyondwork"
  : "http://localhost:3000/beyondwork";
const scopes = "user-read-private user-read-email user-top-read";

export default function Music() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<SpotifyUser | null>(null);
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([]);
  const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("spotify_access_token");
    const storedRefreshToken = localStorage.getItem("spotify_refresh_token");

    const fetchData = async (token: string) => {
      try {
        const [userResponse, tracksResponse, artistsResponse] =
          await Promise.all([
            axios.get("https://api.spotify.com/v1/me", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            axios.get("https://api.spotify.com/v1/me/top/tracks", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                limit: 9,
                offset: 0,
              },
            }),
            axios.get("https://api.spotify.com/v1/me/top/artists", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                limit: 9,
                offset: 0,
              },
            }),
          ]);

        setUserData(userResponse.data);
        setTopTracks(tracksResponse.data.items);
        setTopArtists(artistsResponse.data.items);
      } catch (error: any) {
        handleError(error);
      }
    };

    const handleError = (error: AxiosError<any>) => {
      if (error.response && error.response.status === 401) {
        // Token expired, attempt refresh
        refreshAccessToken();
      } else {
        setError(`Error fetching data: ${error.message}`);
      }
    };

    const refreshAccessToken = async () => {
      try {
        console.log("Refreshing access token...");
        const refreshResponse = await axios.post(
          "https://accounts.spotify.com/api/token",
          new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: storedRefreshToken!,
          }),
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${clientId}:${clientSecret}`
              ).toString("base64")}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        const { access_token } = refreshResponse.data;
        setAccessToken(access_token);
        localStorage.setItem("spotify_access_token", access_token);
        fetchData(access_token);
      } catch (error: any) {
        setError(`Error refreshing access token: ${error.message}`);
        // Handle refresh token failure appropriately
      }
    };

    // Check if access token exists in local storage
    if (storedAccessToken) {
      console.log("Access token found in localStorage:", storedAccessToken);
      setAccessToken(storedAccessToken);
      fetchData(storedAccessToken); // Fetch data directly if access token exists
    } else {
      console.log(
        "No access token found, redirecting to Spotify authorization..."
      );
      // Redirect to Spotify authorization
      authorizeSpotify();
    }
  }, []); // Empty dependency array means this runs once on mount

  const authorizeSpotify = () => {
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scopes)}`;
    window.location.href = authUrl;
  };

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  };

  const handleTrackClick = (track: SpotifyTrack) => {
    const searchQuery = `${track.name} ${track.artists
      .map((artist) => artist.name)
      .join(" ")}`;
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`,
      "_blank"
    );
  };

  const handleArtistClick = (artist: SpotifyArtist) => {
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(artist.name)}`,
      "_blank"
    );
  };

  return (
    <div>
      <section className="music">
        <h2 className="text-2xl font-bold">Music</h2>
        <p className="mt-4">
          I like almost every genre - Rock, EDM, Metal, Classical, Orchestral,
          Indian, Pop, Rap. I was a music producer in the past, used to produce
          EDM music. Later I stopped, but I still listen to songs. I am
          currently learning to play the piano.
        </p>
        <div className="flex flex-col xl:flex-row">
          <div className="xl:w-1/2 xl:mr-10">
            {accessToken && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">My Top Tracks</h2>
                {topTracks.length > 0 ? (
                  <motion.div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topTracks.map((track, index) => (
                      <motion.div
                        key={index}
                        className="bg-slate-900 shadow-lg rounded-lg overflow-hidden cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        initial="hidden"
                        animate="visible"
                        variants={variants}
                        onClick={() => handleTrackClick(track)}
                      >
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(
                            track.name
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={track.album.images[0]?.url}
                            alt={track.name}
                            className="w-full h-40 object-cover"
                          />
                        </a>
                        <div className="p-4">
                          <motion.h3
                            className="text-lg font-semibold"
                            whileHover={{ color: "#1ED760" }}
                          >
                            {track.name}
                          </motion.h3>
                          <p className="text-sm mt-1">
                            {track.artists.map((artist, idx) => (
                              <span key={artist.id}>
                                {artist.name}
                                {idx !== track.artists.length - 1 && ", "}
                              </span>
                            ))}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <p className="text-gray-600">No top tracks found.</p>
                )}
              </div>
            )}
          </div>
          <div className="xl:w-1/2 flex flex-col justify-between cursor-pointer">
            {accessToken && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">My Top Artists</h2>
                {topArtists.length > 0 ? (
                  <motion.div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topArtists.map((artist, index) => (
                      <motion.div
                        key={index}
                        className="shadow-lg rounded-lg overflow-hidden bg-slate-900"
                        whileHover={{ scale: 1.05 }}
                        initial="hidden"
                        animate="visible"
                        variants={variants}
                        onClick={() => handleArtistClick(artist)}
                      >
                        <a
                          href={`https://www.google.com/search?q=${encodeURIComponent(
                            artist.name
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={artist.images[0]?.url || "/default-artist.jpg"}
                            alt={artist.name}
                            className="w-full h-40 object-cover"
                          />
                        </a>
                        <div className="p-4">
                          <motion.h3
                            className="text-lg font-semibold text-white"
                            whileHover={{ color: "#1ED760" }}
                          >
                            {artist.name}
                          </motion.h3>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <p className="text-gray-600">No top artists found.</p>
                )}
              </div>
            )}
            <div className="flex items-center justify-end text-3xl text-green-400 font-bold mt-4">
              Live data from
              <motion.div whileHover={{ scale: 1.1 }}>
                <Image
                  src={spotifywebapilogo}
                  alt="Spotify API logo"
                  width={180}
                  height={180}
                  className="rounded-lg ml-4"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
