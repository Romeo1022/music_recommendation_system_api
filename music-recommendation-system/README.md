# Music Recommendation System Based on User Preference

ITEC 116 backend prototype adapted from the earlier Music Recommendation System proposal.

## Requirements
Node.js, MySQL, NestJS, TypeORM, JWT, Postman.

## Setup
1. Import `database/schema.sql` into MySQL.
2. Copy `.env.example` to `.env` and configure database credentials and JWT_SECRET.
3. Run `npm install` and `npm run start:dev`.
4. Import `postman/Music_Recommendation_System.postman_collection.json`.
5. Register, login, paste the JWT into the Postman `jwt_token` variable, and test CRUD routes.

## API
Base URL: `/api/v1`. Authentication endpoints plus CRUD for users, artists, songs, ratings, genres, favorites, playlists, and recommendations (42 routes).

## Important scope note
Recommendations are currently stored as CRUD records, NOT computed from preferences. Playlist song membership and preference/mood matching are NOT implemented. This is a starting backend scaffold, not a completed or tested recommendation engine. For the original proposal, implement preference matching, genre/artist/mood filtering, and authorization so users cannot modify others' data.

## Submission
Requires your own GitHub repository, SQL export from running MySQL, Postman test evidence, 5–10 minute narrated demo, and technical documentation aligned to tested code.
