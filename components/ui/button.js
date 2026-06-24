/**
 * Button Component
 *
 * Props:
 * - text: Button text
 * - type: button type (button, submit, reset)
 */

function Button(text, type = "button") {
    return `
        <button type="${type}" class="custom-btn">
            ${text}
        </button>
    `;
}

module.exports = Button;