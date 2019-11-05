import {TestBed,async} from '@angular/core/testing';


describe("Foo", () => {


  it("should 1 equal 1", async(() => {
    expect(1).toEqual(1);
  }));

  it("should 1 equals 2", async(() => {
    expect(1).toEqual(2);
  }));


});
