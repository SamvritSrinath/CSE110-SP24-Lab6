
describe('Notetaking App', () => {

    beforeAll(async () => {
        await page.goto('http://localhost:5500/index.html'); // Update URL as needed
    });

    it('should add a new note', async () => {
        await page.waitForSelector('.add-note'); // Increase timeout to 10 seconds

        // Click the "Add Note" button
        await page.click('.add-note');

        // Wait for the note input to appear
        await page.click('.note'); // Increase timeout to 10 seconds

        // Type a new note into the input field
        await page.type('.note', 'Test Note');

        // Click away fro note
        await page.click('body');

        // Get the text content of the new note
        const newNoteContent = await page.$eval('.note', textarea => textarea.value);

        // Verify that the new note content matches what was typed
        console.log(newNoteContent);
        expect(newNoteContent).toBe('Test Note');
        
    });
});