// --- Storage ---
const db = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  datasets: JSON.parse(localStorage.getItem("datasets")) || [],
  consents: JSON.parse(localStorage.getItem("consents")) || [],
  votes: JSON.parse(localStorage.getItem("votes")) || []
};

const CONSENT_THRESHOLD = 0.7;

function save() {
  Object.keys(db).forEach(key =>
    localStorage.setItem(key, JSON.stringify(db[key]))
  );
}

// --- Utilities ---
function id() {
  return Math.random().toString(36).substring(2, 10);
}

// --- Users ---
function createUser() {
  const email = userEmail.value;
  const user = { id: id(), email };
  db.users.push(user);
  save();
  users.textContent = JSON.stringify(db.users, null, 2);
}

// --- Datasets ---
function submitDataset() {
  const dataset = {
    id: id(),
    owner: datasetUser.value,
    type: datasetType.value
  };
  db.datasets.push(dataset);
  save();
  datasets.textContent = JSON.stringify(db.datasets, null, 2);
}

// --- Consent ---
function giveConsent() {
  const consent = {
    id: id(),
    user: consentUser.value,
    dataset: consentDataset.value,
    approved: true
  };
  db.consents.push(consent);
  save();
  consents.textContent = JSON.stringify(db.consents, null, 2);
}

// --- Governance Logic ---
function checkApproval() {
  const datasetId = checkDataset.value;
  const relevant = db.consents.filter(
    c => c.dataset === datasetId
  );

  const approvalRate =
    relevant.length === 0
      ? 0
      : relevant.filter(c => c.approved).length / relevant.length;

  approval.textContent = JSON.stringify(
    {
      dataset: datasetId,
      approvalRate,
      collectiveApproval: approvalRate >= CONSENT_THRESHOLD
    },
    null,
    2
  );
}

// --- Voting ---
function vote() {
  const vote = {
    id: id(),
    user: voteUser.value,
    proposal: proposalId.value,
    support: voteSupport.value === "true"
  };
  db.votes.push(vote);
  save();
  votes.textContent = JSON.stringify(db.votes, null, 2);
}
