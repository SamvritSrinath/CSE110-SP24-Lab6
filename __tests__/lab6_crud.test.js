
describe('Notetaking App', () => {

    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5500/index.html'); // Update URL as needed
    });

    it('Testing to see if button click adds a new note', async () => {
        // Click the "Add Note" button
        const adding_note_button = await page.$('.add-note');
        await adding_note_button.click();
        // Get the number of notes in the page
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        // Verify that 1 note is added
        expect(noteCount).toBe(1);
        // Verify that the default note value is set
        const noteContent = await page.$eval('.note', (note) => note.value);
        expect(noteContent).toBe(''); 
        // Verify placeholder is expected
        const notePlaceholder = await page.$eval('.note', (note) => note.placeholder);
        expect(notePlaceholder).toBe('New Note');
    }, 3500);

    it('Editing the existing note, should update the note to have \'Test Note\'', async () => {
        // Wait for the note input to appear
        const noteElement = await page.$('.note');
        await noteElement.click();
        // Get the textarea element for this note
        await page.type('.note','Test Note');
        // Click tab to save note
        await page.keyboard.press('Tab');
        // Get the text content of the new note
        const newNoteContent = await page.$eval('.note', (note) => note.value);
        // Verify that the new note content matches what was typed
        expect(newNoteContent).toBe('Test Note');
        // Verify that there is still only one note
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        expect(noteCount).toBe(1);
    });

    it('Editing the already existing note after clicking tab, updating text to  add \'#1\'', async () => {
        // Click the note
        await page.click('.note');
        // Get the textarea element for this note
        const noteElement = await page.$('.note');
        // Type a new note into the input field
        await page.keyboard.type(' #1');
        // Click tab to save note
        await page.keyboard.press('Tab');
        // Get the text content of the new note
        const newNoteContent = await page.$eval('.note', (note) => note.value);
        // Verify that the new note content matches what was typed
        expect(newNoteContent).toBe('Test Note #1');
        //verify that there is still only one note
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        expect(noteCount).toBe(1);
    });

    it('Adding another note with the existig one still there, editing text to  add \'Note #2\'', async () => {
        // Click the "Add Note" button
        const adding_note_button = await page.$('.add-note');
        await adding_note_button.click();
        // Get the number of notes in the page
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        // Verify that 1 note is added
        expect(noteCount).toBe(2);
        // Verify that the default note value is set
        const firstnoteContent = await page.$eval('.note', (note) => note.value);
        expect(firstnoteContent).toBe('Test Note #1'); 
        // Get the value of the second note
        const secondNoteContent = await page.$eval('.note:nth-of-type(2)', note => note.value);
        // Verify that the default note value is empty
        expect(secondNoteContent).toBe('');
        // Verify placeholder is expected
        const notePlaceholder = await page.$eval('.note', (note) => note.placeholder);
        expect(notePlaceholder).toBe('New Note');
        // Click the note
        await page.click('.note:nth-of-type(2)');
        // Get the textarea element for this note
        const noteElement = await page.$('.note:nth-of-type(2)');
        // Type a new note into the input field
        await page.keyboard.type('Test Note #2');
        // Click tab to save note
        await page.keyboard.press('Tab');
        // Get the text content of the new note
        const newNoteContent = await page.$eval('.note:nth-of-type(2)', (note) => note.value);
        // Verify that the new note content matches what was typed
        expect(newNoteContent).toBe('Test Note #2');
    }, 3500);

    it('Retains notes after refreshing page', async () => {
        // Refresh page
        await page.reload();
        // Get the textarea element for this note
        const noteElement = await page.$('.note');
        // Get the text content of the note
        const firstNoteContent = await page.$eval('.note', (note) => note.value);
        // Verify that the new note content matches what was typed
        expect(firstNoteContent).toBe('Test Note #1');
        // Get the text content of the second note
        const secondNoteContent = await page.$eval('.note:nth-of-type(2)', (note) => note.value);
        // Verify that the new note content matches what was typed
        expect(secondNoteContent).toBe('Test Note #2');
        //verify that there is still only one note
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        expect(noteCount).toBe(2);
    });

});