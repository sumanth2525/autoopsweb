# Database Guide - Recommendations & Setup

This guide helps you choose and set up a database for the Crime Analytics Dashboard.

## 🎯 Database Recommendations

### For This Project, I Recommend:

#### **1. PostgreSQL (Best Choice) ⭐**
- **Why:** Most versatile, excellent for analytics, great performance
- **Best for:** Production apps, complex queries, data analysis
- **Setup:** Easy with cloud providers (Supabase, Neon, Railway)
- **Cost:** Free tier available

#### **2. MongoDB (Good Alternative)**
- **Why:** Flexible schema, easy to use, great for rapid development
- **Best for:** Prototyping, document-based data, quick setup
- **Setup:** Very easy with MongoDB Atlas (free tier)
- **Cost:** Free tier available

#### **3. SQLite (Simplest)**
- **Why:** No server needed, file-based, perfect for learning
- **Best for:** Development, small projects, local testing
- **Setup:** No setup needed - just install package
- **Cost:** Free

## 📊 Comparison Table

| Database | Type | Setup Difficulty | Best For | Free Tier |
|----------|------|------------------|----------|-----------|
| **PostgreSQL** | SQL | Medium | Production, Analytics | ✅ Yes |
| **MongoDB** | NoSQL | Easy | Prototyping, Documents | ✅ Yes |
| **SQLite** | SQL | Very Easy | Development, Learning | ✅ Yes |
| MySQL | SQL | Medium | Traditional Apps | ✅ Yes |
| Supabase | PostgreSQL | Very Easy | Full-stack Apps | ✅ Yes |

## 🚀 Quick Setup Guides

### Option 1: PostgreSQL (Recommended)

#### Using Supabase (Easiest - Cloud):
1. Go to [supabase.com](https://supabase.com)
2. Sign up for free account
3. Create new project
4. Get connection string from Settings > Database
5. Add to `.env.local`:
   ```env
   DATABASE_URL=postgresql://user:password@host:5432/dbname
   ```

#### Using Local PostgreSQL:
1. Install PostgreSQL: [postgresql.org/download](https://www.postgresql.org/download/)
2. Create database:
   ```sql
   CREATE DATABASE crime_analytics;
   ```
3. Add to `.env.local`:
   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5432/crime_analytics
   ```

### Option 2: MongoDB (Easy Setup)

#### Using MongoDB Atlas (Cloud - Recommended):
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create free cluster
4. Get connection string
5. Add to `.env.local`:
   ```env
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/crime_analytics
   ```

#### Using Local MongoDB:
1. Install MongoDB: [mongodb.com/try/download](https://www.mongodb.com/try/download)
2. Start MongoDB service
3. Add to `.env.local`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/crime_analytics
   ```

### Option 3: SQLite (Simplest - No Setup)

1. Just install the package (no server needed)
2. Database file created automatically
3. Add to `.env.local`:
   ```env
   DATABASE_URL=./crime_analytics.db
   ```

## 📦 Installation Commands

### PostgreSQL
```bash
npm install pg @types/pg
# or with Prisma (recommended)
npm install prisma @prisma/client
npx prisma init
```

### MongoDB
```bash
npm install mongodb mongoose
```

### SQLite
```bash
npm install better-sqlite3
# or
npm install sqlite3
```

## 🗄️ Database Schema Examples

### PostgreSQL/SQLite Schema

```sql
-- Crime data table
CREATE TABLE crime_data (
  id SERIAL PRIMARY KEY,
  agency_code VARCHAR(20) NOT NULL,
  offense_type VARCHAR(50) NOT NULL,
  data_year INTEGER NOT NULL,
  actual INTEGER NOT NULL,
  cleared INTEGER NOT NULL,
  cleared_exceptionally INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(agency_code, offense_type, data_year)
);

-- Agency information
CREATE TABLE agencies (
  id SERIAL PRIMARY KEY,
  agency_code VARCHAR(20) UNIQUE NOT NULL,
  agency_name VARCHAR(255),
  state_name VARCHAR(50),
  state_abbr VARCHAR(2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Search history (optional)
CREATE TABLE search_history (
  id SERIAL PRIMARY KEY,
  agency_code VARCHAR(20),
  offense_type VARCHAR(50),
  start_year INTEGER,
  end_year INTEGER,
  searched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_crime_agency ON crime_data(agency_code);
CREATE INDEX idx_crime_year ON crime_data(data_year);
CREATE INDEX idx_crime_offense ON crime_data(offense_type);
```

### MongoDB Schema (Mongoose)

```javascript
// Crime Data Schema
const crimeDataSchema = new mongoose.Schema({
  agencyCode: { type: String, required: true, index: true },
  offenseType: { type: String, required: true, index: true },
  dataYear: { type: Number, required: true },
  actual: { type: Number, required: true },
  cleared: { type: Number, default: 0 },
  clearedExceptionally: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}, {
  unique: ['agencyCode', 'offenseType', 'dataYear']
});

// Agency Schema
const agencySchema = new mongoose.Schema({
  agencyCode: { type: String, unique: true, required: true },
  agencyName: String,
  stateName: String,
  stateAbbr: String,
  createdAt: { type: Date, default: Date.now }
});
```

## 🔧 Database Connection Utilities

I'll create connection utilities for you. See `lib/db/` directory for:
- `postgres.ts` - PostgreSQL connection
- `mongodb.ts` - MongoDB connection
- `sqlite.ts` - SQLite connection
- `database.ts` - Unified database interface

## 💡 Use Cases for Database

### What You Can Store:

1. **Cached API Data**
   - Store fetched crime data to reduce API calls
   - Faster response times
   - Works offline

2. **User Preferences**
   - Saved searches
   - Favorite agencies
   - Dashboard settings

3. **Analytics**
   - Search history
   - Popular queries
   - Usage statistics

4. **Agency Information**
   - Agency details
   - Location data
   - Contact information

## 🎯 My Recommendation for Your Project

**Start with SQLite for development**, then move to **PostgreSQL (Supabase)** for production.

**Why:**
- SQLite: Zero setup, perfect for learning
- PostgreSQL: Industry standard, great for analytics
- Supabase: Free tier, easy setup, includes auth

## 📚 Next Steps

1. **Choose a database** from recommendations above
2. **Follow setup guide** for your chosen database
3. **Install required packages** (see Installation Commands)
4. **Configure connection** in `.env.local`
5. **Test connection** using `/test-connections` page

## 🔗 Helpful Resources

- **PostgreSQL:** [postgresql.org/docs](https://www.postgresql.org/docs/)
- **MongoDB:** [docs.mongodb.com](https://docs.mongodb.com/)
- **Supabase:** [supabase.com/docs](https://supabase.com/docs)
- **Prisma:** [prisma.io/docs](https://www.prisma.io/docs) (Great ORM for PostgreSQL)

## ❓ Need Help?

- Check connection test page: `/test-connections`
- Review database connection utilities in `lib/db/`
- See examples in `DATABASE_EXAMPLES.md` (coming soon)

---

**Quick Start:** For fastest setup, use **SQLite** (no server needed) or **Supabase** (free cloud PostgreSQL).

