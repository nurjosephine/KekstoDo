# Keks-To-Do Web-App 🍪

Eigenständige, installierbare Web-App für iPhone, iPad, Android und Desktop. Sie enthält die Funktionen der Windows-Version, nur **ohne PDF-Export**.

## Enthalten

- Tageslisten Montag bis Sonntag
- Belohnungskeks nur bei Erledigung am passenden Wochentag
- automatischer Wochenreset am Montag beim nächsten Öffnen
- Themes: Dunkel, Keks, Hühner, Herbst, Weihnachten, Frühling, Halloween, Pride
- Keksshop mit dauerhaft freigeschalteten Themes
- alle Erfolge inklusive geheimem Krümelkönig
- fröhlicher Keks, Konfetti und Krönungsansicht
- Statistik und Wochenhistorie
- optionale Sounds
- Offlinebetrieb als PWA
- Backup-Export und -Import als `.keks`
- Import von Backups der Windows-Version 2.0

## Auf GitHub Pages veröffentlichen

1. Kostenloses Konto auf GitHub erstellen oder anmelden.
2. Ein neues Repository anlegen, zum Beispiel `KeksToDo`.
3. Den **Inhalt dieses Ordners** hochladen. `index.html` muss direkt im Hauptverzeichnis des Repositorys liegen.
4. Im Repository auf **Settings → Pages** gehen.
5. Unter **Build and deployment** auswählen:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
6. Speichern. Nach wenigen Minuten zeigt GitHub die Webadresse an.

Typische Adresse:

`https://DEIN-NAME.github.io/KeksToDo/`

## Auf dem iPhone installieren

1. Die GitHub-Pages-Adresse in **Safari** öffnen.
2. Auf **Teilen** tippen.
3. **Zum Home-Bildschirm** wählen.
4. Falls angezeigt, **Als Web-App öffnen** aktivieren.
5. Mit **Hinzufügen** bestätigen.

Edge kann die Seite normal benutzen. Für die Installation auf dem iPhone ist Safari der zuverlässigste Weg.

## Daten und Backups

Die Daten werden lokal im Browser gespeichert. Unter **Einstellungen** regelmäßig `Backup exportieren` verwenden. Die erzeugte `.keks`-Datei kann in Dateien, OneDrive oder iCloud Drive abgelegt und später wieder importiert werden.

Die Web-App versucht, Backups aus der Windows-Version 2.0 zu übernehmen. Beim Zurückspielen eines Web-Backups in die Windows-App hängt die Kompatibilität davon ab, ob die Windows-Version zusätzliche Felder erwartet. Vor einem Austausch immer beide vorhandenen Datenstände separat sichern.

## Lokal testen

Service Worker funktionieren nicht zuverlässig über eine direkt geöffnete `file://`-Datei. Nutze einen lokalen Webserver, zum Beispiel in diesem Ordner:

```bash
python -m http.server 8080
```

Dann im Browser öffnen:

`http://localhost:8080`
