import React, { useEffect, useState } from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";

import { useSelector, useDispatch } from "react-redux";
import { setEditorCodeAction } from "../redux/actions";

// import closebrackets.js addon to have the closing tag functionality
import "codemirror/addon/edit/closebrackets.js";
import "codemirror/addon/comment/comment.js";

// import "codemirror/mode/";
import "codemirror/keymap/sublime";
// themes
import "codemirror/theme/3024-day.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/abbott.css";
import "codemirror/theme/abcdef.css";
import "codemirror/theme/ambiance-mobile.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/ayu-dark.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/bespin.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/colorforth.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/duotone-dark.css";
import "codemirror/theme/duotone-light.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/theme/gruvbox-dark.css";
import "codemirror/theme/hopscotch.css";
import "codemirror/theme/icecoder.css";
import "codemirror/theme/idea.css";
import "codemirror/theme/isotope.css";
import "codemirror/theme/juejin.css";
import "codemirror/theme/lesser-dark.css";
import "codemirror/theme/liquibyte.css";
import "codemirror/theme/lucario.css";
import "codemirror/theme/material-darker.css";
import "codemirror/theme/material-ocean.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/theme/material.css";
import "codemirror/theme/mbo.css";
import "codemirror/theme/mdn-like.css";
import "codemirror/theme/midnight.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/moxer.css";
import "codemirror/theme/neat.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/night.css";
import "codemirror/theme/nord.css";
import "codemirror/theme/oceanic-next.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/theme/paraiso-dark.css";
import "codemirror/theme/paraiso-light.css";
import "codemirror/theme/pastel-on-dark.css";
import "codemirror/theme/railscasts.css";
import "codemirror/theme/rubyblue.css";
import "codemirror/theme/seti.css";
import "codemirror/theme/shadowfox.css";
import "codemirror/theme/solarized.css";
import "codemirror/theme/ssms.css";
import "codemirror/theme/the-matrix.css";
import "codemirror/theme/tomorrow-night-bright.css";
import "codemirror/theme/tomorrow-night-eighties.css";
import "codemirror/theme/ttcn.css";
import "codemirror/theme/twilight.css";
import "codemirror/theme/vibrant-ink.css";
import "codemirror/theme/xq-dark.css";
import "codemirror/theme/xq-light.css";
import "codemirror/theme/yeti.css";
import "codemirror/theme/yonce.css";
import "codemirror/theme/zenburn.css";

// import "codemirror/theme";

// languages
import "codemirror/mode/apl/apl";
import "codemirror/mode/asciiarmor/asciiarmor";
import "codemirror/mode/asn.1/asn.1";
import "codemirror/mode/asterisk/asterisk";
import "codemirror/mode/brainfuck/brainfuck";
import "codemirror/mode/clike/clike";
import "codemirror/mode/clojure/clojure";
import "codemirror/mode/cmake/cmake";
import "codemirror/mode/cobol/cobol";
import "codemirror/mode/coffeescript/coffeescript";
import "codemirror/mode/commonlisp/commonlisp";
import "codemirror/mode/crystal/crystal";
import "codemirror/mode/css/css";
import "codemirror/mode/cypher/cypher";
import "codemirror/mode/d/d";
import "codemirror/mode/dart/dart";
import "codemirror/mode/diff/diff";
import "codemirror/mode/django/django";
import "codemirror/mode/dockerfile/dockerfile";
import "codemirror/mode/dtd/dtd";
import "codemirror/mode/dylan/dylan";
import "codemirror/mode/ebnf/ebnf";
import "codemirror/mode/ecl/ecl";
import "codemirror/mode/eiffel/eiffel";
import "codemirror/mode/elm/elm";
import "codemirror/mode/erlang/erlang";
import "codemirror/mode/factor/factor";
import "codemirror/mode/fcl/fcl";
import "codemirror/mode/fortran/fortran";
import "codemirror/mode/gas/gas";
import "codemirror/mode/gfm/gfm";
import "codemirror/mode/gherkin/gherkin";
import "codemirror/mode/go/go";
import "codemirror/mode/groovy/groovy";
import "codemirror/mode/haml/haml";
import "codemirror/mode/handlebars/handlebars";
import "codemirror/mode/haskell/haskell";
import "codemirror/mode/haskell-literate/haskell-literate";
import "codemirror/mode/haxe/haxe";
import "codemirror/mode/htmlembedded/htmlembedded";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/http/http";
import "codemirror/mode/idl/idl";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/jinja2/jinja2";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/julia/julia";
import "codemirror/mode/livescript/livescript";
import "codemirror/mode/lua/lua";
import "codemirror/mode/markdown/markdown";
import "codemirror/mode/mathematica/mathematica";
import "codemirror/mode/mbox/mbox";
import "codemirror/mode/mirc/mirc";
import "codemirror/mode/mllike/mllike";
import "codemirror/mode/modelica/modelica";
import "codemirror/mode/mscgen/mscgen";
import "codemirror/mode/mumps/mumps";
import "codemirror/mode/nginx/nginx";
import "codemirror/mode/nsis/nsis";
import "codemirror/mode/ntriples/ntriples";
import "codemirror/mode/octave/octave";
import "codemirror/mode/oz/oz";
import "codemirror/mode/pascal/pascal";
import "codemirror/mode/pegjs/pegjs";
import "codemirror/mode/perl/perl";
import "codemirror/mode/php/php";
import "codemirror/mode/pig/pig";
import "codemirror/mode/powershell/powershell";
import "codemirror/mode/properties/properties";
import "codemirror/mode/protobuf/protobuf";
import "codemirror/mode/pug/pug";
import "codemirror/mode/puppet/puppet";
import "codemirror/mode/python/python";
import "codemirror/mode/q/q";
import "codemirror/mode/r/r";
import "codemirror/mode/rpm/rpm";
import "codemirror/mode/rst/rst";
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/rust/rust";
import "codemirror/mode/sas/sas";
import "codemirror/mode/sass/sass";
import "codemirror/mode/scheme/scheme";
import "codemirror/mode/shell/shell";
import "codemirror/mode/sieve/sieve";
import "codemirror/mode/slim/slim";
import "codemirror/mode/smalltalk/smalltalk";
import "codemirror/mode/smarty/smarty";
import "codemirror/mode/solr/solr";
import "codemirror/mode/soy/soy";
import "codemirror/mode/sparql/sparql";
import "codemirror/mode/spreadsheet/spreadsheet";
import "codemirror/mode/sql/sql";
import "codemirror/mode/stex/stex";
import "codemirror/mode/stylus/stylus";
import "codemirror/mode/swift/swift";
import "codemirror/mode/tcl/tcl";
import "codemirror/mode/textile/textile";
import "codemirror/mode/tiddlywiki/tiddlywiki";
import "codemirror/mode/tiki/tiki";
import "codemirror/mode/toml/toml";
import "codemirror/mode/tornado/tornado";
import "codemirror/mode/troff/troff";
import "codemirror/mode/ttcn/ttcn";
import "codemirror/mode/ttcn-cfg/ttcn-cfg";
import "codemirror/mode/turtle/turtle";
import "codemirror/mode/twig/twig";
import "codemirror/mode/vb/vb";
import "codemirror/mode/vbscript/vbscript";
import "codemirror/mode/velocity/velocity";
import "codemirror/mode/verilog/verilog";
import "codemirror/mode/vhdl/vhdl";
import "codemirror/mode/vue/vue";
import "codemirror/mode/wast/wast";
import "codemirror/mode/webidl/webidl";
import "codemirror/mode/xml/xml";
import "codemirror/mode/xquery/xquery";
import "codemirror/mode/yacas/yacas";
import "codemirror/mode/yaml/yaml";
import "codemirror/mode/yaml-frontmatter/yaml-frontmatter";
import "codemirror/mode/z80/z80";

// main css file
import "../styles/codemirror.css";

function Editor() {
  const snippet = useSelector((state) => state.snippet);
  const dispatch = useDispatch();
  const [snippetCorrectLang, setSnippetCorrectLang] = useState(
    snippet.editorLanguage
  );

  useEffect(() => {
    setSnippetCorrectLang(handleClikeInput(snippet.editorLanguage));
  }, [snippet.editorLanguage]);

  const handleClikeInput = (lang) => {
    switch (lang) {
      case "c":
        return "text/x-csrc";
      case "c++":
        return "text/x-c++src";
      case "java":
        return "text/x-java";
      case "c#":
        return "text/x-csharp";
      case "objective-c":
        return "text/x-objectivec";
      case "scala":
        return "text/x-scala";
      case "squirrel":
        return "text/x-squirrel";
      case "ceylon":
        return "text/x-ceylon";

      default:
        return lang;
    }
  };
  return (
    <div>
      <ControlledEditor
        className="editor"
        onBeforeChange={(editor, data, value) =>
          dispatch(setEditorCodeAction(value))
        }
        value={snippet.code}
        options={{
          keyMap: "sublime",
          lineWrapping: true,
          // mode: snippet.editorLanguage,
          mode: snippetCorrectLang,
          lint: true,
          lineNumbers: true,
          theme: snippet.editorTheme,
          autoCloseBrackets: true,
        }}
      />
      {/* <UncontrolledEditor
        className="editor"
        onChange={(editor, data, value) => dispatch(setEditorCodeAction(value))}
        options={{
          keyMap: "sublime",
          lineWrapping: true,
          mode: snippet.editorLanguage, // here its the editor's language
          lint: true,
          lineNumbers: true,
          theme: user.editorTheme, // here the editor's theme
          autoCloseBrackets: true,
        }}
      /> */}
    </div>
  );
}

export default Editor;
