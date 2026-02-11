import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from '../../database/models/User.js'

// Only enable Google OAuth if credentials exist
if (
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CALLBACK_URL
) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existing = await User.findOne({ googleId: profile.id })
          if (existing) return done(null, existing)

          const email =
            profile.emails && profile.emails[0]
              ? profile.emails[0].value
              : undefined

          const user = await User.create({
            name: profile.displayName,
            email,
            googleId: profile.id,
            profile: {
              avatar:
                profile.photos && profile.photos[0]
                  ? profile.photos[0].value
                  : undefined
            }
          })

          return done(null, user)
        } catch (err) {
          return done(err)
        }
      }
    )
  )

  console.log("✅ Google OAuth enabled")
} else {
  console.log("⚠ Google OAuth disabled — missing credentials")
}

export default passport
