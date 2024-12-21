document.addEventListener('DOMContentLoaded', () => {
  const tabsContainer = document.getElementById('tabs');
  const contentArea = document.getElementById('content');

  // Function to load content for a file
  async function loadFileContent(fileName) {
    try {
      const response = await fetch(`html/${fileName}`);
      if (!response.ok) throw new Error(`Unable to load ${fileName}`);
      const content = await response.text();
      contentArea.innerHTML = `<div>${content}</div>`;
    } catch (error) {
      contentArea.innerHTML = `
        <div style="color: red; padding: 10px; text-align: center;">
          <strong>Error:</strong> ${error.message}
        </div>`;
    }
  }

  // Function to activate a tab
  function activateTab(tabElement) {
    document.querySelector('.tab.active')?.classList.remove('active');
    tabElement.classList.add('active');

    const fileName = tabElement.dataset.file;
    document.querySelector('#status-bar span').textContent = `Active File: ${fileName}`;
    loadFileContent(fileName); // Load the content for the selected file
}

  // Add event listeners to tabs
  tabsContainer.addEventListener('click', (event) => {
    const tab = event.target.closest('.tab');
    if (tab) {
      // If the click is on the "✖", remove the tab
      if (event.target.textContent.trim() === "✖") {
        tab.remove();

        // If the closed tab was active, activate the first tab
        if (tab.classList.contains('active') && tabsContainer.children.length > 0) {
          activateTab(tabsContainer.children[0]);
        } else if (!tabsContainer.children.length) {
          contentArea.innerHTML = `
            <div style="text-align: center; padding: 20px; color: gray;">
              <em>No file open</em>
            </div>`;
        }
        return; // Prevent further event propagation
      }

      // Otherwise, activate the tab
      activateTab(tab);
    }
  });

  // Activate the first tab on load
  const firstTab = tabsContainer.querySelector('.tab');
  if (firstTab) {
    activateTab(firstTab);
  } else {
    contentArea.innerHTML = `
      <div style="text-align: center; padding: 20px; color: gray;">
        <em>No file open</em>
      </div>`;
  }
});
