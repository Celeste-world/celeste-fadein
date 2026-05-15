# Celeste Harbor

Celeste Harbor is a quiet web harbor for recording voyages, receiving small signs, gathering drifted items, building vessels, and opening new sea areas.

This project is not designed as a social network, chatbot, or productivity dashboard.  
It is a private harbor for continuing a quiet voyage.

---

## Current Public Pages

The public-facing area is intentionally small.

```txt
/

Public entrance page.
Shows only:

Google login
About link
/about/

Public explanation page.
Describes Celeste Harbor, Harbor Cat, Presence AI, and the purpose of the harbor.

/voyage/

Public Moonlit Voyage page.
A public-facing work page for the book and its editions.

Login Required Pages

All harbor-internal pages require Google login.

/log/

Voyage Log.
The main private writing page.

/timeline/

Cabin Log.
Timeline record of logs, harbor finds, vessels, tickets, and voyage events.

/items/

Harbor Finds.
Discovered items grouped by sea area.

/vessels/

Vessel record.
Shows current vessel, next vessel requirements, and owned vessel collection.

/map/

Sea Chart.
Shows opened and unopened sea areas.

/account/

Account and ticket management.

/tickets/

Ticket explanation and ticket-related navigation.

/special-voyage/

Time-limited special voyage entry and active voyage interface.

/fragments/

Fragment archive inside the harbor.

/archive/

Archive for old Celeste records.

/harbor/

Legacy harbor route.
Redirects based on authentication state:

logged in → /log/
not logged in → /
Legacy Pages

Old Celeste Console pages are preserved under:

/legacy/

Legacy pages are not login-required, but they should not be indexed.

Each legacy page should include:

<meta name="robots" content="noindex, nofollow">

Current legacy files:

/legacy/about.html
/legacy/philosophy.html
/legacy/silent-structure.html
/legacy/vision.html
/legacy/who-i-am.html
/legacy/who-this-is-for.html
/legacy/faq.html
/legacy/timeline.html
/legacy/README.md

Root-level old HTML pages redirect to their legacy equivalents:

/about.html              → /legacy/about.html
/philosophy.html         → /legacy/philosophy.html
/silent-structure.html   → /legacy/silent-structure.html
/vision.html             → /legacy/vision.html
/who-i-am.html           → /legacy/who-i-am.html
/who-this-is-for.html    → /legacy/who-this-is-for.html
/faq.html                → /legacy/faq.html
/timeline.html           → /legacy/timeline.html

/auth/ redirects to /.

Core Loop

The main harbor loop is:

Voyage Log
↓
Harbor Cat response
↓
Harbor Find
↓
Items
↓
Vessels
↓
Sea Area Unlock
↓
Map
↓
Cabin Log

The user writes a Voyage Log.
Harbor Cat responds briefly without advice or diagnosis.
Sometimes an item drifts into the harbor.
Items are used to prepare vessels.
Vessels open new sea areas.
Sea areas expand item pools.
All important events are recorded in Cabin Log.

Fixed Design Policy
Vessels
There are 9 vessels.
Vessel creation is item-consumption based.
Vessels are part of the user’s growth record.
/vessels/ shows:
current vessel
next vessel requirements
owned vessel collection
mist-covered locked vessels
Items
There are 25 harbor item types.
/items/ shows discovered items only.
Items are grouped by sea area.
Undiscovered items are not shown.
Unopened areas are shown as “霧の向こう”.
Sea Areas

Initial sea areas:

harbor
silent_water
lighthouse_coast
fog_sea
moonlit_sea
deep_current
unnamed_waters

Sea areas are shown in /map/.

Unopened areas appear as:

霧の向こう
Harbor Find Rate

Normal Voyage Log:

12%

Special Voyage:

40%

Deep Sea Voyage:

60%

First Harbor Find is guaranteed once per user.

Tags are treated as “signs” or “weather” of the log.
They lightly influence item weighting, but they do not unlock unopened areas.

Harbor Cat

Harbor Cat does not diagnose, advise, evaluate, or solve.
It returns a short quiet presence after a log is saved.

Important Supabase Tables

Core tables include:

vessels
harbor_items
vessel_requirements
sea_areas
area_item_pools
user_vessels
user_harbor_items
user_sea_areas
voyage_logs
voyage_tickets
voyage_sessions
user_timeline_events
Important Views

Current display views include:

user_current_vessel_view
next_vessel_requirements_view
user_harbor_items_view
user_timeline_events_view
user_max_vessel_stage_view
user_vessels_collection_view
vessel_requirements_display_view

Some collection display is handled through RPC rather than relying only on views.

Important RPC Functions
ensure_user_vessel()

Ensures the initial vessel and user harbor state exist.

Used by:

/log/
/vessels/
check_and_unlock_next_vessel()

Checks whether the user has enough required items to unlock the next vessel.

If requirements are met:

consumes required items
unlocks next vessel
records timeline event

Used by:

/vessels/
check_and_unlock_sea_areas()

Unlocks sea areas according to owned vessel count.

Current rule:

1 vessel  → harbor
2 vessels → silent_water
3 vessels → lighthouse_coast
4 vessels → fog_sea
5 vessels → moonlit_sea
6 vessels → deep_current
7 vessels → unnamed_waters

Used by:

/map/
/vessels/
grant_random_harbor_find(p_tag, p_context, p_force)

Handles Harbor Find logic.

Features:

normal drift rate: 12%
special voyage rate: 40%
deep sea voyage rate: 60%
first harbor find guarantee
open-area-only item pool
rarity weighting
light tag-based area boost
user inventory update
timeline event creation

Used by:

/log/
get_user_vessels_collection()

Returns all 9 vessels for the current user with:

owned/current status
locked mist status
vessel details
image paths
stage order

Used by:

/vessels/
Authentication Policy

Only these pages are public:

/
/about/
/voyage/

All other active harbor pages require Google login.

Protected pages use:

<body class="auth-locked">

and:

body.auth-locked .wrap{
  visibility:hidden;
}

Unauthenticated users are redirected to:

/

Logout also redirects to:

/
SEO Policy

sitemap.xml should include only public pages:

/
 /about/
 /voyage/

robots.txt should allow public pages and disallow internal or legacy areas.

Public:

/
/about/
/voyage/

Disallowed:

/log/
/timeline/
/items/
/vessels/
/map/
/account/
/tickets/
/special-voyage/
/fragments/
/archive/
/harbor/
/auth/
/legacy/

Legacy pages should also include:

<meta name="robots" content="noindex, nofollow">
Current Completion Status

Completed:

formal DB reset
9 vessels registered
25 harbor item types registered
vessel requirements registered
7 sea areas registered
area item pools registered
initial user_sea_areas behavior
key display views
ensure_user_vessel()
check_and_unlock_next_vessel()
check_and_unlock_sea_areas()
grant_random_harbor_find()
/log/ formal RPC connection
Voyage Log save
Harbor Cat response
Harbor Find
Timeline record
Recent Logs
/account/ lightweight page
/timeline/ Cabin Log separation
/items/ sea-area grouping
/vessels/ vessel collection display
/map/ sea chart
public/private route cleanup
legacy migration
sitemap / robots cleanup
Current Page Structure
/
  Public entrance

/about/
  Public explanation

/voyage/
  Public Moonlit Voyage page

/log/
  Voyage Log

/timeline/
  Cabin Log

/items/
  Harbor Finds by sea area

/vessels/
  Current vessel, next vessel, owned vessels

/map/
  Sea Chart

/account/
  Account and tickets

/tickets/
  Ticket explanation

/special-voyage/
  Special Voyage

/fragments/
  Internal fragment archive

/archive/
  Internal archive entrance

/legacy/
  Old Celeste records
Future Work Candidates

Possible next work:

polish /log/ Harbor Weather wording
adjust /map/ card placement and mobile layout
refine /vessels/ collection visuals
add richer vessel acquisition timeline
improve ticket UX
implement paid Special Voyage tickets
implement Deep Sea Ticket behavior
add admin maintenance notes
create a database schema backup file
create a development changelog
Notes

Celeste Harbor should remain quiet.

The system should not become a productivity dashboard, social feed, or optimization tool.
The core experience is a small harbor where the user can return, write, notice what has drifted in, and continue.

The ship is still moving.
