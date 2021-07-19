<!--
 Copyright 2021 Anthony Mugendi
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

# What?
Recursively match balanced string pairs, like { and } or <b> and </b> using [balanced-match](https://www.npmjs.com/package/balanced-match) and add **level** information to the matches.

## Example
```yarn add balanced-match-all```

```javascript

    const match_all = require("balanced-match-all")

    let str = 'pre{in{nested{deep-nested}}}post'
    let arr = match_all('{', '}', str);

    console.log(arr);

    console.log(arr.map(o => o.body));

```

This will output:

```json
    [
        {
            "start": 3,
            "end": 27,
            "pre": "pre",
            "body": "in{nested{deep-nested}}",
            "post": "post",
            "level": 0
        },
        {
            "start": 6,
            "end": 26,
            "pre": "in",
            "body": "nested{deep-nested}",
            "post": "",
            "level": 1
        },
        {
            "start": 13,
            "end": 25,
            "pre": "nested",
            "body": "deep-nested",
            "post": "",
            "level": 2
        }
    ]

```

## API
The API is exactly the same as **balanced-match**.

### var m = balanced(a, b, str)

For the first non-nested matching pair of `a` and `b` in `str`, return an
object with those keys:

- **start** the index of the first match of `a`
- **end** the index of the matching `b`
- **pre** the preamble, `a` and `b` not included
- **body** the match, `a` and `b` not included
- **post** the postscript, `a` and `b` not included

If there's no match, `undefined` will be returned.

If the `str` contains more `a` than `b` / there are unmatched pairs, the first match that was closed will be used. For example, `{{a}` will match `['{', 'a', '']` and `{a}}` will match `['', 'a', '}']`.