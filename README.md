# Celeste Harbor

Celeste Harbor is a quiet web harbor for recording voyages, receiving small signs, gathering drifted items, building vessels, and opening new sea areas.

This project is not designed as a social network, chatbot, or productivity dashboard.  
It is a private harbor for continuing a quiet voyage.

---

## Current Public Pages

The public-facing area is intentionally small.

### `/`

Public entrance page.

Shows only:

- Google login
- About link

### `/about/`

Public explanation page.

Describes Celeste Harbor, Harbor Cat, Presence AI, and the purpose of the harbor.

### `/voyage/`

Public Moonlit Voyage page.

A public-facing work page for the book and its editions.

---

## Login Required Pages

All harbor-internal pages require Google login.

### `/log/`

Voyage Log.

The main private writing page.

Includes:

- Voyage Log save
- Harbor Cat response
- Harbor Find
- Harbor Find display card
- Drift Ticket display card
- Tonight's Harbor
- Harbor Weather
- Recent Logs

### `/timeline/`

Cabin Log.

Timeline record of logs, harbor finds, vessels, tickets, sea areas, and voyage events.

Includes:

- image-based event cards
- Harbor Find item images
- Drift Ticket image display
- vessel acquisition images
- sea area / sea chart image display
- event-type color accents
- Read more / Show less display

### `/items/`

Harbor Finds.

Discovered items grouped by sea area.

Includes:

- sea-area grouping
- item image display
- item image enlargement modal

### `/vessels/`

Vessel record.

Shows:

- current vessel
- next vessel requirements
- owned vessel collection
- mist-covered locked vessels
- vessel image enlargement modal

### `/map/`

Sea Chart.

Shows opened and unopened sea areas.

Includes:

- sea chart image
- sea area cards
- sea chart enlargement modal

### `/account/`

Account and ticket management.

### `/tickets/`

Ticket explanation and ticket-related navigation.

### `/special-voyage/`

Time-limited special voyage entry and active voyage interface.

### `/fragments/`

Fragment archive inside the harbor.

### `/archive/`

Archive for old Celeste records.

### `/harbor/`

Legacy harbor route.

Redirects based on authentication state:

```txt
logged in     → /log/
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
vessel images
vessel image enlargement modal
Items

There are 25 harbor item types.

/items/ shows discovered items only.

Items are grouped by sea area.
Undiscovered items are not shown.
Unopened areas are shown as 霧の向こう.

/items/ includes:

image display
image enlargement modal
sea-area grouping
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

/map/ includes:

sea chart image
opened / unopened sea area cards
sea chart enlargement modal
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

The UI should not expose internal probability details too directly.
Harbor Find should feel like a quiet sign from the harbor, not a reward dashboard.

Current /log/ display wording:

何かが流れ着く夜もあれば、ただ波だけが残る夜もあります。
Drift Ticket Display

/log/ includes a Drift Ticket display card.

The card appears below the Harbor Find card.

Current display states:

Quiet
Checking
Granted

The card should not expose internal ticket rules too directly.

Current default wording:

小さな航海券が流れ着く夜があります。
それは、少しだけ深い海へ降りるための合図です。

After saving a Voyage Log:

Checking while the harbor checks for a ticket
Granted if a Drift Ticket is granted
Quiet if no ticket arrives

Drift Ticket notices may also appear inside the Harbor Cat scroll.

Cabin Log / Timeline Display

/timeline/ is the visual record of harbor events.

Current display behavior:

events are shown as image-based cards
initial display shows 5 events
Read more expands all events
Show less returns to the first 5 events
events are loaded from user_timeline_events_view

Current image behavior:

Harbor Find      → harbor item image
Drift Ticket     → ticket image
Vessel acquired  → vessel image
Sea Area opened  → sea chart image
Fallback         → quiet symbolic icon

Current supported image fields from user_timeline_events_view:

image_path
image_alt

The frontend also checks fallback image fields:

item_image_path
harbor_item_image_path
vessel_image_path
ticket_image_path
related_image_path

Event cards use quiet visual differences by event type:

harbor_find      → green / find tone
ticket_drifted   → subdued purple / ticket tone
vessel_acquired  → gold / vessel tone
sea_area_opened  → sea chart image

Drift Ticket images should remain subdued so they do not visually overpower item or vessel events.

Harbor Cat

Harbor Cat does not diagnose, advise, evaluate, or solve.

It returns a short quiet presence after a log is saved.

Current behavior:

appears after saving a Voyage Log
reads the log as a scroll
returns a short quiet response
can show Harbor Find notices inside the scroll
can show Drift Ticket notices inside the scroll

Harbor Cat should remain a presence, not an assistant.

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

user_timeline_events_view

user_timeline_events_view is used by /timeline/.

It should return event fields plus image fields.

Expected columns include:

id
user_id
event_type
event_key
title
body
metadata
created_at
image_path
image_alt

Image resolution policy:

metadata image path should be used first if present
Harbor Find should join to harbor_items by metadata.item_key
vessel events should join to vessels by metadata.vessel_key or vessel id fields
ticket events may use fixed ticket image paths
sea area events may use the sea chart image

Important metadata examples:

{
  "item_key": "driftwood",
  "item_name_ja": "漂流木",
  "area_key": "harbor",
  "area_name_ja": "港"
}

Current fixed image paths may include:

/images/tickets/drift-ticket.svg
/images/tickets/special-voyage-ticket.svg
/images/tickets/deep-sea-ticket.svg
/images/sea-chart-z.png
/images/harbor-cat/cat-harbor-main.png
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

Current UI behavior:

result appears inside Harbor Cat scroll
result also appears in the Harbor Find display card
result appears in /timeline/ with the harbor item image
internal guarantee/rate language is not shown directly to the user
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
get_user_vessels_collection()
/log/ formal RPC connection
Voyage Log save
Harbor Cat response
Harbor Find
Harbor Find display card
Drift Ticket display card
Recent Logs
/timeline/ Cabin Log separation
/timeline/ image-based event cards
/timeline/ Harbor Find image display
/timeline/ Drift Ticket image display
/timeline/ vessel acquisition image display
/timeline/ sea area image display
/timeline/ Read more / Show less
/account/ lightweight page
/items/ sea-area grouping
/items/ image display
/items/ image enlargement modal
/vessels/ vessel collection display
/vessels/ vessel image enlargement modal
/map/ sea chart
/map/ sea area cards
/map/ sea chart enlargement modal
/tickets/ ticket explanation page
public/private route cleanup
legacy migration
sitemap / robots cleanup
README creation and update
Current Page Structure
/
  Public entrance

/about/
  Public explanation

/voyage/
  Public Moonlit Voyage page

/log/
  Voyage Log
  Harbor Cat
  Harbor Find display card
  Drift Ticket display card
  Tonight's Harbor
  Harbor Weather

/timeline/
  Cabin Log
  Image-based event cards
  Read more / Show less

/items/
  Harbor Finds by sea area
  Item image modal

/vessels/
  Current vessel, next vessel, owned vessels
  Vessel image modal

/map/
  Sea Chart
  Sea chart modal

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
Visual / Interaction Features

Current implemented visual features:

/items/
  item images
  item enlargement modal

/vessels/
  current vessel image
  next vessel image
  vessel collection images
  vessel enlargement modal

/map/
  sea chart image
  sea area cards
  sea chart enlargement modal

/log/
  Tonight's Harbor
  Harbor Weather
  Harbor Cat scroll
  Harbor Find display card
  Drift Ticket display card

/timeline/
  image-based event cards
  Harbor Find item images
  Drift Ticket image
  vessel acquisition images
  sea area image
  Read more / Show less

Modal behavior should generally include:

click to open
close button
background click to close
Escape key to close
object-fit: contain for images
mobile-safe layout

Timeline card behavior should generally include:

first 5 events shown by default
Read more to show all loaded events
Show less to collapse
image fallback if image_path is missing or broken
subdued visual treatment for Drift Ticket images
Storage / Image Path Notes

Current image path patterns include:

/images/sea-chart-z.png
/images/harbor-cat/cat-harbor-main.png
/images/tickets/drift-ticket.svg
/images/tickets/special-voyage-ticket.svg
/images/tickets/deep-sea-ticket.svg

Harbor item images are stored in harbor_items.image_path.

Vessel images are stored in vessels.image_path.

Timeline images should come from user_timeline_events_view.image_path.

If an image is missing, pages should fall back gracefully to:

symbolic icon
image pending text
or quiet placeholder
Future Work Candidates

Possible next work:

confirm /account/ ticket display and ticket state
polish /log/ Harbor Weather wording
adjust /map/ card placement and mobile layout
refine /vessels/ collection visuals
add richer vessel acquisition timeline
improve ticket UX
implement paid Special Voyage tickets
implement Deep Sea Ticket behavior
add optional sound later
add admin maintenance notes
create a database schema backup file
create a development changelog
Deferred Ideas

These ideas are intentionally deferred.

Sound

Sound may be added later, but it is not currently active.

Potential direction:

quiet harbor ambience
gentle waves
distant wind
subtle wooden vessel creak
user-controlled sound toggle only

Sound should never autoplay without user action.

Richer Animation

Possible later additions:

subtle Harbor Find shimmer
vessel unlock glow
map mist transition
item discovery reveal
timeline event reveal

Animation should remain quiet and minimal.

Notes

Celeste Harbor should remain quiet.

The system should not become a productivity dashboard, social feed, or optimization tool.

The core experience is a small harbor where the user can return, write, notice what has drifted in, and continue.

The ship is still moving.
