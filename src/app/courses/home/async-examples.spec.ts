import { delay } from "rxjs/operators";
import { fakeAsync, flush, tick, flushMicrotasks } from "@angular/core/testing";
import { of } from "rxjs";

xdescribe("Async Testing Examples", () => {
  it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      console.log("running assertions");
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it("Asynchronous test example - setTimeout()", fakeAsync(() => {
    let test = false;

    setTimeout(() => {
      console.log("running assertions setTimeout()");
      test = true;
    }, 1000);
    // tick(1000);
    flush();
    expect(test).toBeTruthy();
  }));

  it("Asynchronous test example - plain Promise()", fakeAsync(() => {
    let test = false;

    console.log("Creating promise");
    Promise.resolve().then(() => {
      console.log("Promise evaluated successfully");
      test = true;
    });

    flushMicrotasks(); //Microtasks events are Promises, while events like timeouts are Tasks. Microtasks gets executed first(priority)
    console.log("running test assertions");
    expect(test).toBeTruthy();
  }));

  it("Asynchronous test example - Promises + setTimeout()", fakeAsync(() => {
    let counter = 0;

    console.log("Creating promise");
    Promise.resolve().then(() => {
      console.log("Promise evaluated successfully");
      counter += 10;
      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);
  }));

  it("Asynchronous test example - Observables", fakeAsync(() => {
    let test = false;
    console.log("Creating Observables");
    const test$ = of(test).pipe(delay(1000));
    test$.subscribe(() => {
      test = true;
    });
    tick(1000);
    console.log("Running test assertions");
    expect(test).toBe(true);
  }));
});
