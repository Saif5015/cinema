export interface Actor {
  id: number;
  image: string;
  name: string;
  dateOfBirth: string;
  height: string;
  placeOfBirth: string;
  nationality: string;
  bio: string;
  avgRating: number;
  debut: string;
  totalMovies: number;
  knownFor: { id: number; image: string; title: string }[];
  famousRole: string;
  upcomingProject: string;
  totalAwardsWon: number;
  nominations: string[];
  instagram: string;
  twitter: string;
  favoriteMovie: string;
  skills: string[];
}

export interface MyMovie {
  id: number;
  title: string;
  year: number;
  rating: number;
  image: string;
  director: string;
  duration: string;
  genre: string[];
  synopsis: string;
  cast: Actor[];
  language: string;
  releaseDate: string;
  budget: string;
  boxOffice: string;
  trailerLink: string;
}

export const totalMovies: MyMovie[] = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    rating: 8.8,
    image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    director: "Christopher Nolan",
    duration: "2h 28m",
    genre: ["Action", "Sci-Fi", "Thriller"],
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
    cast: [
      {
        id: 101,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4aKQqBBKCnD7KDC7vodrdnJsAhVYQREzDgw&s",
        name: "Leonardo DiCaprio",
        dateOfBirth: "1974-11-11",
        height: "6 ft",
        placeOfBirth: "Los Angeles, California",
        nationality: "American",
        bio: "Leonardo DiCaprio is an award-winning American actor and environmentalist known for his versatile roles in critically acclaimed films. He began his career in television before transitioning to the big screen and gaining global recognition.",
        avgRating: 8.4,
        debut: "Critters 3 (1991)",
        totalMovies: 55,
        knownFor: [
          {
            id: 1001,
            image: "https://m.media-amazon.com/images/I/51oDgOmKN-L.AC.jpg",
            title: "Inception",
          },
          {
            id: 1002,
            image: "https://m.media-amazon.com/images/I/71jR4c4MTCL.AC_SL1024.jpg",
            title: "Titanic",
          },
          {
            id: 1003,
            image: "https://m.media-amazon.com/images/I/71+LUFeUFTL.AC_SL1500.jpg",
            title: "The Wolf of Wall Street",
          },
        ],
        famousRole: "Dom Cobb (Inception)",
        upcomingProject: "Killers of the Flower Moon",
        totalAwardsWon: 101,
        nominations: ["Academy Awards (Best Actor)", "Golden Globe Awards (Best Actor)"],
        instagram: "https://www.instagram.com/leonardodicaprio/",
        twitter: "https://twitter.com/LeoDiCaprio",
        favoriteMovie: "2001: A Space Odyssey",
        skills: ["Environmental activism", "Philanthropy"],
      },
    ],
    language: "English",
    releaseDate: "2010-07-16",
    budget: "$160 million",
    boxOffice: "$836.8 million",
    trailerLink: "https://www.youtube.com/watch?v=YoHD9XEInc0"
  },
];