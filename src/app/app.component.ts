import { Component } from '@angular/core';
// import * as AccelatrixFramework from 'accelatrix/accelatrix';
// const Accelatrix: typeof AccelatrixFramework.Accelatrix = <any>AccelatrixFramework;
import { Bio } from './classes/Bio';
import { SerializationTests } from './classes/Serializationtest.module';
import { Accelatrix } from "accelatrix/accelatrix";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'Accelatrix ' + Accelatrix.Version + " on " + Date.Now.ToDayMonthString() + " " + Date.Now.getUTCFullYear();

}

// ======================= ENUMERATIONS ======================================

var myEnumeration = Accelatrix.Collections.Enumerable.Range(0, 10000000)
.Select(z => z % 2 == 0
             ? new Bio.Feline(z % 10, 9)
             : new Bio.Mammal(z % 10))
.OfType(Bio.Mammal)
.Where(z => z.NumberOfTits != 1)
.GroupBy(z => z.NumberOfTits)

var myResult = myEnumeration.Skip(2)
                            .Take(4)
                            .ToList()
// .OrderBy(z => z.NumberOfTits);
console.log('myResult1:', myResult)

// // ********************************************************************

var myDog = new Bio.Mammal(8);
var myCat = new Bio.Feline(8, 9);
console.log('myCatQQQ:', myCat)

var timeIsSame = (new Date()).Equals(new Date());                //true
var areEqual = myDog.Equals(myCat);                              // false
var myCatType = myCat.GetType();                                 // Bio.Feline
var myCatBaseType = myCat.GetType().BaseType;                    // Bio.Mammal
var isAnimal = myCat.GetType().IsAssignableFrom(Bio.Animal);     // true
var enums = Bio.TypesOfLocomotion.GetType();
var promise;

// // ======================= ASYNC ======================================

var myEnumeration = Accelatrix.Collections.Enumerable.Range(0, 10000000)
                                                      .Select(z => z % 2 == 0
                                                                  ? new Bio.Feline(z % 10, 9)
                                                                  : new Bio.Mammal(z % 10))
                                                      .OfType(Bio.Mammal)
                                                      .Where(z => z.NumberOfTits != 1)
                                                      .GroupBy(z => z.NumberOfTits)

var myResult = new Accelatrix.Collections.AsyncEnumerable(myEnumeration).Select(z => z).ToList();
// var continuation = myResult.ContinueWith(z => console.log(z));
var myResult = new Accelatrix.Collections.AsyncEnumerable(myEnumeration).Select(z => z).ToList()
// .ContinueWith(z => console.log(z), true);

console.log('myResult2:', myResult)
//========================================================================


// ================= serialization ================================

var x = Accelatrix.Serialization.ToJSON(SerializationTests.GetClassInstance())

// '{"$type":"SerializableClass","NameProp":"Test Sat Jul 13 2024 09:12:03 GMT+0200 (Central European Summer Time)","Time":"2024-07-13T09:12:03.527"}'


var y = Accelatrix.Serialization.FromJSON(x)
console.log(y.GetType())  // SerializableClass

// var myEnumerable = Accelatrix.Collections.Enumerable
//                              .Range(0, 10)
//                              .Select(z => new Bio.Canine(z, 2))
//                              .OfType(Bio.Mammal)
//                              .Where(z => z.NumberOfTits % 2 == 0);  // enumeration not executed

// var serialised = Accelatrix.Serialization.ToJSON(myEnumerable);     // enumeration not executed

// var newEnumeration = Accelatrix.Serialization.FromJSON(serialised); // enumeration not executed

// console.log(newEnumeration);
// console.log(newEnumeration.ToList());  // enumeration executed

//======================================================================

// Example 1
var myTask = new Accelatrix.Tasks.Task(z => "Hello " + z.toString(), "John Doe");
var cancellablePromise = myTask.Start();

cancellablePromise.Then(result => console.log(result))
                  .Catch(ex => console.error(ex))
                  .Finally(task => console.log(task));

// Example 2
// var myData = [ new Bio.Canine.Dog(), new Bio.Canine.Wolf(), new Bio.Feline(8, 9) ]

// Accelatrix.Tasks.Task.StartNew(data => data.OfType(Bio.Canine).Distinct().ToList(), myData)
//                      .GetAwaiter()
//                      .Then(result => console.log(result))
//                      .Catch(ex => console.error(ex))
//                      .Finally(task => console.log(task));

// // Example 3: you can even pass enumerations and have them execute in the Web Worker
// var myData = Accelatrix.Collections.Enumerable
//                                    .Range(0, 100000)
//                                    .Select(z => new Bio.Feline(z % 3 == 0, 9));  // nothing executed

// Accelatrix.Tasks.Task.StartNew(data => data.Distinct().ToList(), myData)
//                      .GetAwaiter()
//                      .Then(result => console.log(result))
//                      .Catch(ex => console.error(ex))
//                      .Finally(task => console.log(task));


// // Example 4: Stress-load with 100 parallel requests
// Accelatrix.Collections.Enumerable
//                       .Range(0, 100)
//                       .ForEach(z =>
//                       {
//                             Accelatrix.Tasks.Task.StartNew(data => data.Distinct().ToList(), myData)
//                                                  .GetAwaiter()
//                                                  .Finally(task => console.log("Task: " + z.toString()));
//                       });


// // Example 5: Combine tasks into a single resultset
// Accelatrix.Tasks.CombinedTask.StartNew([
//                                             new Accelatrix.Tasks.Task((a, b) => Accelatrix.Collections.Enumerable.Range(a, b).ToList(), 0, 20),
//                                             new Accelatrix.Tasks.Task(() => Accelatrix.Collections.Enumerable.Range(20, 20).ToList()),
//                                             () => Accelatrix.Collections.Enumerable.Range(40, 20).ToList(),
//                                        ])
//                              .GetAwaiter()
//                              .Then(result => console.log(result))
//                              .Catch(ex => console.error(ex))
//                              .Finally(task => console.log(task));


// // Example 6: Share state between parallel activies (with a cost!)
// // This example will produce a single result from the task that runs first
// var shared = Accelatrix.Tasks.StatefulActivity();

// Accelatrix.Tasks.CombinedTask.StartNew([
// 					   new Accelatrix.Tasks.ActivitySet([
// 										z => z.Take(1),
// 										shared.PushAndEvaluate(z => 1,
//                                                                (accumulated, mine) => accumulated.Where(z => z != null).Any()
//                                                                                       ? z => z.Take(0)
//                                                                                       : z => z ),
// 										z => z.ToList()
// 									  ],
// 									  [[0, 1, 2, 3, 4, 5]]),
// 					   new Accelatrix.Tasks.ActivitySet([
// 										z => z.Take(3),
// 										shared.PushAndEvaluate(z => 3,
//                                                                (accumulated, mine) => accumulated.Where(z => z != null).Any()
//                                                                                       ? z => z.Take(0)
//                                                                                       : z => z.Take(1) ),
// 										z => z.ToList()
// 									  ],
// 									  [[6, 7, 8, 9,10, 11]])
// 					])
// 			       .GetAwaiter()
// 			       .Then(z => console.log(z))
// 			       .Catch(ex => console.error(ex))
// 			       .Finally(t => shared.Dispose())
