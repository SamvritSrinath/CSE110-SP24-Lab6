
describe('Notetaking App', () => {

    beforeAll(async () => {
        await page.goto('http://localhost:5500/index.html'); // Update URL as needed
    });

    it('should add a new note', async () => {
        // Click the "Add Note" button
        await page.click('.add-note');

        // Get the number of notes in the page
        const noteCount = await page.$$eval('.note', notes => notes.length);

        // Verify that 1 note is added
        expect(noteCount).toBe(1);
    });

    it('should edit the new note', async () => {
        // Wait for the note input to appear
        await page.click('.note');

        // Type a new note into the input field
        await page.type('.note', 'Test Note');

        // Click tab to save note
        await page.keyboard.press('Tab');

        // Wait for the note input to appear
        //await page.waitForSelector('.note');
        
        // Get the text content of the new note
        const newNoteContent = await page.$$eval('.note', textarea => textarea.value);

        // Verify that the new note content matches what was typed
        expect(newNoteContent).toBe('Test Note');
    });

    it('should edit the existing note', async () => {
        // Wait for the note input to appear
        await page.click('.note');

        // Type a new note into the input field
        await page.type('.note', 'skibidy');

        // Click tab to save note
        await page.keyboard.press('Tab');

        // Wait for the note input to appear
        //await page.waitForSelector('.note');

        // Get the text content of the new note
        const newNoteContent = await page.$$eval('.note', textarea => textarea.value);

        // Verify that the new note content matches what was typed
        expect(newNoteContent).toBe('Test Noteskibidy');
        
    });

    

});