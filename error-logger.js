window.addEventListener("error", async (event) => {
  await saveFrontendError({
    type: "javascript_error",
    message: event.message,
    source: event.filename,
    line: event.lineno,
    column: event.colno,
    page: window.location.pathname
  });
});

window.addEventListener("unhandledrejection", async (event) => {
  await saveFrontendError({
    type: "promise_error",
    message: event.reason?.message || String(event.reason),
    page: window.location.pathname
  });
});

async function saveFrontendError(errorData) {
  try {
    if (!window.firebase || !firebase.apps?.length) return;

    const db = firebase.firestore();

    await db.collection("errorLogs").add({
      ...errorData,
      url: window.location.href,
      userAgent: navigator.userAgent,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn("Error logger failed:", err);
  }
}
