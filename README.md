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

Timeline record of logs, harbor finds, vessels, tickets, and voyage events.

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
