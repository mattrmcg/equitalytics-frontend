# Equitalytics
![eql-gif](https://github.com/user-attachments/assets/6ee5c5c6-2a78-4a9c-9eac-6ee2e38e7c0a)


[Equitalytics](https://www.equitalytics.net) is a platform for analyzing fundamental company filing data. The intention is to provide easy and convenient access to filing metrics for over 2500 public companies.

All data is aggregated, validated, and stored on a postgres instance. All metrics are sourced directly from the SEC.

Unfortunately, some companies do not report certain metrics under the same names, so data for some companies may be omitted because it was either not included or included under an unrecognized naming scheme. This is something I'm actively working to fix.

The backend repository is located [here](https://github.com/mattrmcg/equitalytics-backend). This is where the bulk of the code written for the project is stored.

**NOTE**: 
The architecture of this project has changed since it's launch. The scraping code has been separated and stored in [this](https://github.com/mattrmcg/eql-scraper) repository. The data was originally stored in an azure postgres instance, but it's been moved to a Supabase instance, which eliminated the need for a separate backend. The frontend now queries table data directly from Supabase's postgREST API.
