var ThreadPaneColumns;
try {
  ({ ThreadPaneColumns } = ChromeUtils.importESModule("chrome://messenger/content/ThreadPaneColumns.mjs"));
} catch (err) {
  ({ ThreadPaneColumns } = ChromeUtils.importESModule("chrome://messenger/content/thread-pane-columns.mjs"));
}

const registeredIds = [];

function normalizeAddress(raw) {
  const match = raw.match(/<([^>]+)>/);
  return match ? match[1].trim() : raw.trim();
}

function getApexDomain(domain) {
  const parts = domain.toLowerCase().split(".");
  if (parts.length <= 2) return parts.join(".");
  // Keep 3 parts for common ccSLDs (co.uk, com.au, net.nz, org.uk, gov.uk, etc.)
  const sld = parts[parts.length - 2];
  const knownSLDs = ["co", "com", "net", "org", "gov", "edu", "ac", "me", "ne"];
  if (sld.length <= 3 && knownSLDs.includes(sld)) {
    return parts.slice(-3).join(".");
  }
  return parts.slice(-2).join(".");
}

function senderDomain(message) {
  const addr = normalizeAddress(message.author);
  const atIdx = addr.lastIndexOf("@");
  if (atIdx === -1) return "";
  return getApexDomain(addr.slice(atIdx + 1));
}

var customColumns = class extends ExtensionCommon.ExtensionAPI {
  getAPI(context) {
    context.callOnClose(this);
    return {
      customColumns: {
        async add(id, name, field) {
          registeredIds.push(id);
          ThreadPaneColumns.addCustomColumn(id, {
            name: name,
            hidden: false,
            icon: false,
            resizable: true,
            sortable: true,
            textCallback: senderDomain,
          });
        },
      },
    };
  }

  close() {
    for (const id of registeredIds) {
      ThreadPaneColumns.removeCustomColumn(id);
    }
  }
};
