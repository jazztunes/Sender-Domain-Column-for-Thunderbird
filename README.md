# Sender Domain Column for Thunderbird

Adds a **Sender Domain** column to Thunderbird's message list showing the apex domain of each sender's email address — subdomains are automatically collapsed.

| Sender address | Column shows |
|---|---|
| `info@abc.com` | `abc.com` |
| `admin@help.xyz.com` | `xyz.com` |
| `noreply@mail.bbc.co.uk` | `bbc.co.uk` |

![Sender Domain column in Thunderbird message list](screenshot.png)

## Why this is useful

Thunderbird's default view shows whatever name the sender chose to display — which tells you nothing about where the email actually came from. The Sender Domain column cuts through that and shows the real origin domain at a glance.

### Spot spam and phishing faster

Spam and phishing emails often arrive with legitimate-looking display names ("PayPal Support", "Your Bank") but the domain tells the real story. A glance at the Sender Domain column immediately flags anything that doesn't come from the domain you'd expect. You don't need to open the email or hover over anything — the domain is right there in the list.

### Sort and group by sender domain

Click the **Sender Domain** column header to sort your inbox by domain. This clusters all emails from the same organisation together regardless of which address or subdomain they used — `billing@`, `noreply@`, `support@` all roll up to the same domain. Great for:

- Reviewing everything from a vendor before a meeting
- Seeing how much mail you get from a particular company
- Batch-selecting and filing messages by sender

### Manage mailing lists and newsletters

Marketing emails and newsletters often come from sending platforms (`mailchimp.com`, `sendgrid.net`, `klaviyo.com`) rather than the brand's own domain. Sorting by Sender Domain makes it easy to find all your newsletter mail in one sweep, even when the display names are all different.

### Audit unfamiliar senders

When clearing a backlog or reviewing an unfamiliar account, sorting by domain gives you a structured view of who has been sending mail — much faster than reading individual From addresses one by one.

### Filter and search more precisely

Once you know the domain you care about, Thunderbird's search and filter tools become more powerful. Sort by Sender Domain, select a block of messages, and apply a label, move them, or delete them in bulk.

---

## Requirements

- Thunderbird 115 or newer

## Installation

1. Download `sender-domain-column.xpi` from the [Releases](../../releases) page (or build it yourself — see below).
2. In Thunderbird, open the menu and go to **Add-ons and Themes**.
3. Click the gear icon ⚙ and choose **Install Add-on From File**.
4. Select the `.xpi` file and click **Add**.

## Enabling the column

After installing, the column is hidden by default. To show it:

1. Right-click anywhere on the **column header bar** in your message list.
2. Tick **Sender Domain** in the menu.

You can drag it to reorder it and click the header to sort by domain.

## Building from source

Requires Windows with PowerShell (no extra tools needed).

```bat
git clone https://github.com/jazztunes/Sender-Domain-Column-for-Thunderbird
cd Sender-Domain-Column-for-Thunderbird
build.bat
```

This produces `sender-domain-column.xpi` in the project root, which you can install as described above.

## How subdomain collapsing works

The extension keeps only the **apex domain** — the registered part of the hostname:

- Simple domains (`abc.com`, `example.org`) are kept as-is.
- Subdomains (`mail.`, `help.`, `cdn.`) are stripped.
- Country-code second-level domains (`co.uk`, `com.au`, `gov.uk`, etc.) are detected and preserved with their parent label, so `mail.bbc.co.uk` becomes `bbc.co.uk` rather than `co.uk`.

## License

MIT
