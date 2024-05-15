
describe('Notetaking App', () => {

    beforeAll(async () => {
        await page.goto('http://127.0.0.1:5500/CSE110-SP24-Lab6/index.html'); // Update URL as needed
    });

    it('Testing to see if button click adds a new note', async () => {
        // Click the "Add Note" button
        const adding_note_button = await page.$('.add-note');
        await adding_note_button.click();

        // Get the number of notes in the page
        const noteCount = await page.$$eval('.note', (notes) => notes.length);

        // Verify that 1 note is added
        expect(noteCount).toBe(1);
        //verify that the default note value is set
        const noteContent = await page.$eval('.note', (note) => note.value);
        expect(noteContent).toBe(''); 

        //verify placeholder is expected
        const notePlaceholder = await page.$eval('.note', (note) => note.placeholder);
        expect(notePlaceholder).toBe('New Note');
    }, 2500);

    it('Editing the existing note, should update the note to have \'Test Note\'', async () => {
        // Wait for the note input to appear
        const noteElement = await page.$('.note');
        await noteElement.click()
        //get the textarea element for this note

        // const noteTextArea = await noteElement.getProperty('textArea');
        // Type a new note into the input field
        //check if the note is editable
        await page.type('.note','Test Note');

        // Click tab to save note
        await page.keyboard.press('Tab');

        // Wait for the note input to appear
        //await page.waitForSelector('note');
        
        // Get the text content of the new note
        const newNoteContent = await page.$eval('.note', (note) => note.value);

        // Verify that the new note content matches what was typed
        expect(newNoteContent).toBe('Test Note');

        //verify that there is still only one note
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        expect(noteCount).toBe(1);
    });

    it('Editing the already existing note after clicking tab, updating text to  add \'Skibidy\'', async () => {

        // Click the note
        await page.click('.note');
        
        //get the textarea element for this note
        const noteElement = await page.$('.note');

        const noteTextArea = await noteElement.getProperty('textArea');
        // Type a new note into the input field
        await page.keyboard.type(' Skibidy');

        // Click tab to save note
        await page.keyboard.press('Tab');
        
        // Get the text content of the new note
        const newNoteContent = await page.$eval('.note', (note) => note.value);

        // Verify that the new note content matches what was typed
        expect(newNoteContent).toBe('Test Note Skibidy');

        //verify that there is still only one note
        const noteCount = await page.$$eval('.note', (notes) => notes.length);
        expect(noteCount).toBe(1);

    });

    

});