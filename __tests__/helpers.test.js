const {format_date} = require("../utils/helpers");
const {format_plural} = require("../utils/helpers");
const {format_url} = require("../utils/helpers");

//date test
test ("format_date() returns a date string", ()=> {
    const date = new Date ("2022-10-12 16:37:06");

    expect(format_date(date)).toBe("10/12/2022");
});



//plural test
test("format_plural() will return accurate plural form for words", ()=> {
    const nonPlural = format_plural("lion",1);
    const plural = format_plural("tiger", 2);

    expect(nonPlural).toBe("lion");
    expect(plural).toBe("tigers");
})


//url test
test("format_url() returns a simplified string", ()=> {
    const url1= format_url("http://test.com/page/1");
    const url2=format_url("http://www.coolstuff.com/abcdefg/");
    const url3=format_url("https://www.google.com?q=hello");

    expect(url1).toEqual("test.com");
    expect(url2).toEqual("coolstuff.com");
    expect(url3).toEqual("google.com");
})