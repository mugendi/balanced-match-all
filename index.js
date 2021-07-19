// Copyright 2021 Anthony Mugendi
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var balanced = require('balanced-match')

function m_all(pre, post, str) {

    m_all.level = m_all.level === undefined ? 0 : m_all.level;

    m_all.arr = m_all.arr || [];

    let o = balanced(pre, post, str);

    if (o) {

        o.level = m_all.level;

        m_all.arr.push(o);

        let idx = m_all.arr.length - 1;

        if (idx > 0) {
            o.start += m_all.arr[idx - 1].start + pre.length;
            o.end += m_all.arr[idx - 1].start + post.length
        }

        // loop till all are called
        m_all.level++;
        m_all(pre, post, o.body);

    }

    return m_all.arr;

}


module.exports = m_all;