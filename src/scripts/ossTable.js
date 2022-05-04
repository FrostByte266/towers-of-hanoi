import '../styles/corner.css'

function elementToAnchor(el, targetHref) {
  const a = document.createElement("a")
  a.innerText = el.innerText
  a.href = targetHref
  el.replaceChild(a, el.childNodes[0])
  return a
}

if (window.location.protocol === "file:") {
  const warningText = document.createElement("h1")
  warningText.style.color = "red"
  const innerText = document.createTextNode(
    "Warning: Due to CORS rules in this browser, this table may fail to load. If the table is blank, please load this from a localhost server"
  )
  warningText.appendChild(innerText)
  document.body.prepend(warningText)
}

fetch(window.location.toString().replace(/html/, 'json'))
  .then(res => res.json())
  .then(data => {
    // Create Table
    const tableEl = document.getElementById("licenses")
    const outputKeys = ["name", "version", "author", "source", "license"]
    data.forEach(pkg => {
      const newRow = document.createElement("tr")
      outputKeys
        .map(key => [key, pkg[key]])
        .forEach(([key, value]) => {
          const tableData = document.createElement("td")
          tableData.innerText = value
          tableData.dataset.key = key
          newRow.appendChild(tableData)
        })
      tableEl.appendChild(newRow)
    })
    // Apply Custom Formatting

    // Convert the source links to clickable a tags
    const sourceLinks = document.querySelectorAll("td[data-key=source]")
    sourceLinks.forEach(link => elementToAnchor(link, link.innerText))

    // Add click listners to display a popup with the full license text
    const licenses = document.querySelectorAll("td[data-key=license]")
    licenses.forEach((license, i) => {
      elementToAnchor(license, "#")
      license.addEventListener("click", () => alert(data[i].licenseText))
    })
  })
